import { randomUUID } from 'crypto'
import { pool, query } from './db.mjs'

function img(seed, w, h) {
  return `https://picsum.photos/seed/${seed}/${w}/${h}.jpg`
}

function makeItem(title, category, seed) {
  return {
    title,
    category,
    file_url: img(seed, 1280, 960),
    thumbnail_url: img(seed, 600, 600),
  }
}

const items = [
  makeItem('Omoku Power Plant — Aerial View', 'Our Plants', 'fipl-omoku-aerial'),
  makeItem('Eleme Gas Turbine Hall', 'Our Plants', 'fipl-eleme-turbine'),
  makeItem('Trans-Amadi Control Room', 'Our Plants', 'fipl-transamadi-control'),
  makeItem('Switchyard at Dusk', 'Our Plants', 'fipl-switchyard-dusk'),

  makeItem('Engineering Team On Site', 'People', 'fipl-engineering-team'),
  makeItem('Operations Staff Portrait', 'People', 'fipl-operations-staff'),
  makeItem('Leadership at Annual Review', 'People', 'fipl-leadership-review'),

  makeItem('2025 Scholarship Award Ceremony', 'Events', 'fipl-scholarship-2025'),
  makeItem('Nigeria Energy Summit Booth', 'Events', 'fipl-energy-summit'),
  makeItem('Long Service Awards Night', 'Events', 'fipl-service-awards'),

  makeItem('Community Borehole Commissioning', 'FIPL Foundation', 'fipl-borehole'),
  makeItem('Primary Health Centre Handover', 'FIPL Foundation', 'fipl-health-centre'),
]

const existing = await query('select title from media_kits')
const existingTitles = new Set(existing.map((r) => r.title))
const toInsert = items.filter((i) => !existingTitles.has(i.title))

if (toInsert.length === 0) {
  console.log('All media items already exist — nothing to insert.')
  await pool.end()
  process.exit(0)
}

console.log(`Inserting ${toInsert.length} media item(s)…`)

for (const item of toInsert) {
  await query(
    'insert into media_kits (id, title, category, file_url, thumbnail_url) values (?, ?, ?, ?, ?)',
    [randomUUID(), item.title, item.category, item.file_url, item.thumbnail_url],
  )
}

console.log(`\nDone — ${toInsert.length} media item(s) inserted:\n`)
toInsert.forEach((m) => console.log(`  ✓ [${m.category}] ${m.title}`))

await pool.end()
