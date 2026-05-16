'use client'

import { useEffect, useRef } from 'react'

const D = Math.PI / 180

type Ring = [number, number][]

// Nigeria outline [lon, lat] — used for brand highlight
const NIGERIA: Ring = [
  [3.4,4.2],[4.2,3.3],[5.0,3.0],[5.8,2.7],[6.5,2.7],[7.0,3.0],[8.5,3.8],
  [9.5,3.7],[10.5,4.0],[12.0,4.0],[13.0,4.0],[13.5,4.5],[14.0,5.0],
  [14.5,6.0],[14.8,8.0],[14.5,10.0],[14.0,11.0],[13.5,12.0],[13.0,13.0],
  [12.5,13.5],[12.0,14.0],[11.0,13.5],[10.0,13.3],[9.0,12.8],[8.0,12.5],
  [7.0,13.0],[6.0,13.0],[5.0,13.5],[4.5,13.0],[4.2,12.0],[3.8,11.0],
  [3.5,10.0],[3.2,9.0],[3.0,8.0],[2.8,7.0],[2.7,6.0],[2.8,5.0],[3.4,4.2],
]

function project(lon: number, lat: number, rot: number, R: number) {
  const phi = lat * D
  const lam = (lon - rot) * D
  const cosc = Math.cos(phi) * Math.cos(lam)
  if (cosc <= 0) return null
  return { x: R * Math.cos(phi) * Math.sin(lam), y: -R * Math.sin(phi) }
}

function drawRing(
  ctx: CanvasRenderingContext2D,
  ring: Ring,
  cx: number, cy: number,
  rot: number, R: number,
) {
  let first = true
  let wasVis = false
  ring.forEach(([lon, lat]) => {
    const p = project(lon, lat, rot, R)
    if (p) {
      const px = cx + p.x
      const py = cy + p.y
      if (first || !wasVis) { ctx.moveTo(px, py); first = false }
      else ctx.lineTo(px, py)
    }
    wasVis = !!p
  })
}

export function SplashGlobe() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const rafRef = useRef<number>()
  const rot = useRef(20)
  const ringsRef = useRef<Ring[]>([])
  const nigeriaRef = useRef<Ring>(NIGERIA)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D
    if (!ctx) return

    const SIZE = Math.min(660, window.innerWidth * 0.94, window.innerHeight * 0.92)
    canvas.width = SIZE
    canvas.height = SIZE
    const cx = SIZE / 2
    const cy = SIZE / 2
    const R = SIZE * 0.47

    // Load Natural Earth land data via topojson
    try {
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const topo = require('world-atlas/land-110m.json')
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const { feature } = require('topojson-client')
      const geo = feature(topo, topo.objects.land)

      const collected: Ring[] = []

      const extractRings = (geom: { type: string; coordinates: unknown }) => {
        if (geom.type === 'Polygon') {
          const coords = geom.coordinates as Ring[]
          collected.push(coords[0]) // outer ring only
        } else if (geom.type === 'MultiPolygon') {
          const coords = geom.coordinates as Ring[][]
          coords.forEach(poly => collected.push(poly[0]))
        }
      }

      if (geo.type === 'FeatureCollection') {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        geo.features.forEach((f: any) => extractRings(f.geometry))
      } else if (geo.type === 'Feature') {
        extractRings(geo.geometry)
      } else {
        extractRings(geo)
      }

      ringsRef.current = collected
    } catch {
      // data unavailable — globe still shows grid
    }

    function frame() {
      ctx.clearRect(0, 0, SIZE, SIZE)

      // ── Sphere base ──
      const bg = ctx.createRadialGradient(cx - R * 0.18, cy - R * 0.18, R * 0.05, cx, cy, R)
      bg.addColorStop(0, '#111128')
      bg.addColorStop(1, '#040408')
      ctx.beginPath()
      ctx.arc(cx, cy, R, 0, Math.PI * 2)
      ctx.fillStyle = bg
      ctx.fill()

      // Clip everything inside the sphere circle
      ctx.save()
      ctx.beginPath()
      ctx.arc(cx, cy, R, 0, Math.PI * 2)
      ctx.clip()

      // ── Latitude grid lines ──
      ctx.strokeStyle = 'rgba(255,255,255,0.10)'
      ctx.lineWidth = 0.5
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

      // ── Longitude grid lines ──
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

      // ── Land masses ──
      if (ringsRef.current.length > 0) {
        // Fill pass
        ctx.beginPath()
        ringsRef.current.forEach(ring => drawRing(ctx, ring, cx, cy, rot.current, R))
        ctx.fillStyle = 'rgba(255,255,255,0.13)'
        ctx.fill()

        // Stroke pass
        ctx.strokeStyle = 'rgba(255,255,255,0.55)'
        ctx.lineWidth = 0.7
        ringsRef.current.forEach(ring => {
          ctx.beginPath()
          drawRing(ctx, ring, cx, cy, rot.current, R)
          ctx.stroke()
        })
      }

      // ── Nigeria highlight ──
      ctx.beginPath()
      drawRing(ctx, nigeriaRef.current, cx, cy, rot.current, R)
      ctx.fillStyle = 'rgba(224,48,39,0.6)'
      ctx.fill()
      ctx.strokeStyle = 'rgba(244,120,32,1)'
      ctx.lineWidth = 1.5
      ctx.beginPath()
      drawRing(ctx, nigeriaRef.current, cx, cy, rot.current, R)
      ctx.stroke()

      // ── 3D lighting: dark rim + lit upper-left ──
      const light = ctx.createRadialGradient(
        cx - R * 0.4, cy - R * 0.4, 0,
        cx, cy, R * 1.05,
      )
      light.addColorStop(0,   'rgba(200,210,255,0.06)')
      light.addColorStop(0.5, 'rgba(0,0,0,0)')
      light.addColorStop(1,   'rgba(0,0,10,0.88)')
      ctx.fillStyle = light
      ctx.beginPath()
      ctx.arc(cx, cy, R, 0, Math.PI * 2)
      ctx.fill()

      // ── Specular highlight (upper-left glint) ──
      const spec = ctx.createRadialGradient(
        cx - R * 0.38, cy - R * 0.42, 0,
        cx - R * 0.38, cy - R * 0.42, R * 0.28,
      )
      spec.addColorStop(0, 'rgba(255,255,255,0.20)')
      spec.addColorStop(1, 'rgba(255,255,255,0)')
      ctx.fillStyle = spec
      ctx.beginPath()
      ctx.arc(cx, cy, R, 0, Math.PI * 2)
      ctx.fill()

      ctx.restore()

      // ── Sphere rim ──
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
