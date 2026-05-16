'use client'

import { useEffect, useRef } from 'react'

const D = Math.PI / 180

const LAND: [number, number][][] = [
  // Africa
  [[-18,15],[-12,8],[-5,5],[2,5],[10,2],[15,-2],[18,-10],[20,-20],[18,-35],[20,-35],
   [25,-34],[30,-30],[36,-24],[40,-12],[42,-8],[45,5],[43,12],[50,12],[45,25],[40,30],
   [37,37],[30,38],[25,38],[20,37],[15,37],[10,37],[5,35],[0,30],[-5,25],[-10,20],[-15,20],[-18,15]],
  // Europe
  [[-10,36],[0,36],[15,37],[28,40],[35,42],[30,48],[20,55],[12,56],[5,58],
   [0,55],[-5,48],[-8,44],[-10,36]],
  // Asia
  [[35,42],[50,38],[60,40],[75,42],[90,48],[100,50],[115,42],[125,40],[130,45],
   [140,45],[145,40],[140,35],[135,28],[125,22],[115,18],[105,10],[100,5],[104,1],
   [115,-5],[125,-10],[130,-5],[140,-10],[145,-15],[148,0],[148,10],[140,15],
   [130,20],[122,25],[110,30],[100,38],[90,38],[80,38],[68,42],[60,48],[50,45],[40,42],[35,42]],
  // North America
  [[-65,20],[-80,25],[-85,28],[-90,28],[-100,28],[-110,28],[-120,33],[-125,38],
   [-135,55],[-140,60],[-140,70],[-130,70],[-110,70],[-90,70],[-75,65],[-65,60],
   [-55,48],[-55,44],[-65,40],[-75,35],[-70,25],[-65,20]],
  // South America
  [[-75,12],[-80,8],[-75,2],[-72,-2],[-70,-8],[-75,-15],[-80,-22],[-80,-33],
   [-75,-38],[-68,-55],[-62,-55],[-58,-38],[-48,-28],[-40,-15],[-35,-8],
   [-35,-4],[-40,0],[-50,5],[-60,10],[-70,12],[-75,12]],
  // Australia
  [[114,-30],[120,-24],[126,-18],[132,-15],[136,-14],[140,-18],[145,-25],
   [150,-30],[152,-38],[144,-38],[138,-36],[132,-32],[126,-32],[118,-32],[114,-30]],
  // Greenland
  [[-50,60],[-45,65],[-42,70],[-45,75],[-50,80],[-60,82],[-70,82],[-58,76],[-56,70],[-50,65],[-50,60]],
  // Antarctica
  [[-180,-68],[-120,-72],[-60,-65],[0,-68],[60,-65],[120,-72],[180,-68],[180,-90],[-180,-90],[-180,-68]],
]

// Nigeria — highlighted in brand colour
const NIGERIA: [number, number][] = [
  [3,4],[5,3],[7,4],[9,4],[13,4],[15,6],[15,10],[14,12],[12,14],[8,12],[5,10],[3,7],[3,4],
]

function project(lon: number, lat: number, rot: number, R: number) {
  const phi = lat * D
  const lam = (lon - rot) * D
  if (Math.cos(phi) * Math.cos(lam) <= 0) return null
  return {
    x: R * Math.cos(phi) * Math.sin(lam),
    y: -R * Math.sin(phi),
  }
}

function drawPoly(
  ctx: CanvasRenderingContext2D,
  poly: [number, number][],
  cx: number, cy: number,
  rot: number, R: number,
  fillStyle: string,
  strokeStyle: string,
  lineWidth: number,
) {
  ctx.beginPath()
  let down = false
  let wasVis = false
  poly.forEach(([lon, lat]) => {
    const p = project(lon, lat, rot, R)
    if (p) {
      if (!down || !wasVis) { ctx.moveTo(cx + p.x, cy + p.y); down = true }
      else ctx.lineTo(cx + p.x, cy + p.y)
    }
    wasVis = !!p
  })
  ctx.fillStyle = fillStyle
  ctx.fill()
  ctx.strokeStyle = strokeStyle
  ctx.lineWidth = lineWidth
  ctx.stroke()
}

export function SplashGlobe() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const rafRef = useRef<number>()
  const rot = useRef(20)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const SIZE = Math.min(640, window.innerWidth * 0.94, window.innerHeight * 0.94)
    canvas.width = SIZE
    canvas.height = SIZE
    const cx = SIZE / 2
    const cy = SIZE / 2
    const R = SIZE * 0.47

    function frame() {
      ctx.clearRect(0, 0, SIZE, SIZE)

      // Sphere base gradient
      const bg = ctx.createRadialGradient(cx - R * 0.15, cy - R * 0.15, R * 0.05, cx, cy, R)
      bg.addColorStop(0, '#13132e')
      bg.addColorStop(1, '#04040c')
      ctx.beginPath()
      ctx.arc(cx, cy, R, 0, Math.PI * 2)
      ctx.fillStyle = bg
      ctx.fill()

      // Clip all globe content to the circle
      ctx.save()
      ctx.beginPath()
      ctx.arc(cx, cy, R, 0, Math.PI * 2)
      ctx.clip()

      // Latitude lines
      ctx.strokeStyle = 'rgba(255,255,255,0.14)'
      ctx.lineWidth = 0.6
      for (let lat = -60; lat <= 60; lat += 30) {
        const phi = lat * D
        ctx.beginPath()
        let first = true
        for (let lo = -180; lo <= 180; lo += 2) {
          const lam = (lo - rot.current) * D
          if (Math.cos(phi) * Math.cos(lam) <= 0) { first = true; continue }
          const x = cx + R * Math.cos(phi) * Math.sin(lam)
          const y = cy - R * Math.sin(phi)
          if (first) { ctx.moveTo(x, y); first = false } else ctx.lineTo(x, y)
        }
        ctx.stroke()
      }

      // Longitude lines
      for (let lo = 0; lo < 360; lo += 30) {
        ctx.beginPath()
        let first = true
        for (let lat = -90; lat <= 90; lat += 2) {
          const phi = lat * D
          const lam = (lo - rot.current) * D
          if (Math.cos(phi) * Math.cos(lam) <= 0) { first = true; continue }
          const x = cx + R * Math.cos(phi) * Math.sin(lam)
          const y = cy - R * Math.sin(phi)
          if (first) { ctx.moveTo(x, y); first = false } else ctx.lineTo(x, y)
        }
        ctx.stroke()
      }

      // Continents
      LAND.forEach(poly =>
        drawPoly(ctx, poly, cx, cy, rot.current, R,
          'rgba(255,255,255,0.11)',
          'rgba(255,255,255,0.5)',
          0.8)
      )

      // Nigeria — brand highlight
      drawPoly(ctx, NIGERIA, cx, cy, rot.current, R,
        'rgba(224,48,39,0.55)',
        'rgba(244,120,32,0.9)',
        1.4)

      // 3D lighting overlay — dark rim, faint lit area upper-left
      const light = ctx.createRadialGradient(
        cx - R * 0.38, cy - R * 0.38, 0,
        cx, cy, R * 1.05,
      )
      light.addColorStop(0,   'rgba(180,180,230,0.07)')
      light.addColorStop(0.5, 'rgba(0,0,0,0)')
      light.addColorStop(1,   'rgba(0,0,12,0.85)')
      ctx.fillStyle = light
      ctx.beginPath()
      ctx.arc(cx, cy, R, 0, Math.PI * 2)
      ctx.fill()

      // Specular highlight
      const spec = ctx.createRadialGradient(
        cx - R * 0.37, cy - R * 0.4, 0,
        cx - R * 0.37, cy - R * 0.4, R * 0.26,
      )
      spec.addColorStop(0, 'rgba(255,255,255,0.22)')
      spec.addColorStop(1, 'rgba(255,255,255,0)')
      ctx.fillStyle = spec
      ctx.beginPath()
      ctx.arc(cx, cy, R, 0, Math.PI * 2)
      ctx.fill()

      ctx.restore()

      // Globe rim
      ctx.beginPath()
      ctx.arc(cx, cy, R, 0, Math.PI * 2)
      ctx.strokeStyle = 'rgba(255,255,255,0.18)'
      ctx.lineWidth = 1.5
      ctx.stroke()

      rot.current = (rot.current + 0.1) % 360
      rafRef.current = requestAnimationFrame(frame)
    }

    frame()
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current) }
  }, [])

  return <canvas ref={canvasRef} className="splash-globe-canvas" aria-hidden="true" />
}
