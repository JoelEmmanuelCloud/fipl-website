'use client'

import { useEffect, useRef } from 'react'

const D = Math.PI / 180

type Ring = [number, number][]

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

interface Props {
  onReady?: () => void
}

export function SplashGlobe({ onReady }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const rafRef = useRef<number>()
  const rot = useRef(20)
  const ringsRef = useRef<Ring[]>([])
  const nigeriaRings = useRef<Ring[]>([])
  const readyCalled = useRef(false)

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

    const { feature } = require('topojson-client')

    try {
      const topo = require('world-atlas/land-110m.json')
      const geo = feature(topo, topo.objects.land)
      const collected: Ring[] = []
      const extractRings = (geom: any) => {
        if (geom.type === 'Polygon') {
          collected.push(geom.coordinates[0] as Ring)
        } else if (geom.type === 'MultiPolygon') {
          geom.coordinates.forEach((poly: Ring[]) => collected.push(poly[0]))
        }
      }
      if (geo.type === 'FeatureCollection') {
        geo.features.forEach((f: any) => extractRings(f.geometry))
      } else if (geo.type === 'Feature') {
        extractRings(geo.geometry)
      } else {
        extractRings(geo)
      }
      ringsRef.current = collected
    } catch { }

    try {
      const countriesTopo = require('world-atlas/countries-110m.json')
      const countriesGeo = feature(countriesTopo, countriesTopo.objects.countries)
      const nigeria = (countriesGeo as any).features?.find(
        (f: any) => String(f.id) === '566',
      )
      if (nigeria) {
        const geom = nigeria.geometry as any
        if (geom.type === 'Polygon') {
          nigeriaRings.current = [geom.coordinates[0] as Ring]
        } else if (geom.type === 'MultiPolygon') {
          nigeriaRings.current = geom.coordinates.map((p: Ring[]) => p[0])
        }
      }
    } catch { }

    function frame() {
      ctx.clearRect(0, 0, SIZE, SIZE)

      const bg = ctx.createRadialGradient(cx - R * 0.18, cy - R * 0.18, R * 0.05, cx, cy, R)
      bg.addColorStop(0, '#111128')
      bg.addColorStop(1, '#040408')
      ctx.beginPath()
      ctx.arc(cx, cy, R, 0, Math.PI * 2)
      ctx.fillStyle = bg
      ctx.fill()

      ctx.save()
      ctx.beginPath()
      ctx.arc(cx, cy, R, 0, Math.PI * 2)
      ctx.clip()

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

      if (ringsRef.current.length > 0) {
        ctx.beginPath()
        ringsRef.current.forEach(ring => drawRing(ctx, ring, cx, cy, rot.current, R))
        ctx.fillStyle = 'rgba(255,255,255,0.13)'
        ctx.fill()

        ctx.strokeStyle = 'rgba(255,255,255,0.55)'
        ctx.lineWidth = 0.7
        ringsRef.current.forEach(ring => {
          ctx.beginPath()
          drawRing(ctx, ring, cx, cy, rot.current, R)
          ctx.stroke()
        })
      }

      if (nigeriaRings.current.length > 0) {
        ctx.beginPath()
        nigeriaRings.current.forEach(ring => drawRing(ctx, ring, cx, cy, rot.current, R))
        ctx.fillStyle = 'rgba(224,48,39,0.65)'
        ctx.fill()

        ctx.strokeStyle = 'rgba(244,120,32,1)'
        ctx.lineWidth = 1.5
        ctx.beginPath()
        nigeriaRings.current.forEach(ring => drawRing(ctx, ring, cx, cy, rot.current, R))
        ctx.stroke()
      }

      const light = ctx.createRadialGradient(cx - R * 0.4, cy - R * 0.4, 0, cx, cy, R * 1.05)
      light.addColorStop(0,   'rgba(200,210,255,0.06)')
      light.addColorStop(0.5, 'rgba(0,0,0,0)')
      light.addColorStop(1,   'rgba(0,0,10,0.88)')
      ctx.fillStyle = light
      ctx.beginPath()
      ctx.arc(cx, cy, R, 0, Math.PI * 2)
      ctx.fill()

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

      ctx.beginPath()
      ctx.arc(cx, cy, R, 0, Math.PI * 2)
      ctx.strokeStyle = 'rgba(255,255,255,0.18)'
      ctx.lineWidth = 1.5
      ctx.stroke()

      if (!readyCalled.current) {
        readyCalled.current = true
        setTimeout(() => onReady?.(), 150)
      }

      rot.current = (rot.current + 0.1) % 360
      rafRef.current = requestAnimationFrame(frame)
    }

    frame()
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current) }
  }, [onReady])

  return <canvas ref={canvasRef} className="splash-globe-canvas" aria-hidden="true" />
}
