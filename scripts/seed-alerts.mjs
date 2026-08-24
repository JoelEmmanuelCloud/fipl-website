import { randomUUID } from 'crypto'
import { pool, query } from './db.mjs'

const alerts = [
  {
    title: 'Planned Website Maintenance',
    message:
      'Our portal may be briefly unavailable on Saturday 13 June, 22:00–23:00 WAT. Thank you for your patience.',
    type: 'info',
    is_active: true,
  },
  {
    title: 'Omoku Plant Routine Maintenance',
    message:
      'Unit 2 will undergo scheduled maintenance from 15–17 June. No supply impact is expected.',
    type: 'warning',
    is_active: false,
  },
  {
    title: 'Temporary Grid Constraint Notice',
    message:
      'Upstream grid constraints may cause brief load adjustments. Our team is actively managing the situation.',
    type: 'critical',
    is_active: false,
  },
  {
    title: 'New Career Opportunities',
    message:
      'Several engineering and operations roles are now open. Visit our Careers page to apply.',
    type: 'info',
    is_active: false,
  },
  {
    title: 'Public Holiday Office Hours',
    message:
      'Our offices will be closed on the upcoming public holiday and reopen the next working day.',
    type: 'warning',
    is_active: false,
  },
]

const existing = await query('select title from alerts')
const existingTitles = new Set(existing.map((r) => r.title))
const toInsert = alerts.filter((a) => !existingTitles.has(a.title))

if (toInsert.length === 0) {
  console.log('All alerts already exist — nothing to insert.')
  await pool.end()
  process.exit(0)
}

console.log(`Inserting ${toInsert.length} alert(s)…`)

for (const a of toInsert) {
  await query('insert into alerts (id, title, message, type, is_active) values (?, ?, ?, ?, ?)', [
    randomUUID(),
    a.title,
    a.message,
    a.type,
    a.is_active,
  ])
}

console.log(`\nDone — ${toInsert.length} alert(s) inserted:\n`)
toInsert.forEach((a) => console.log(`  ✓ [${a.type}${a.is_active ? ', live' : ', off'}] ${a.title}`))

await pool.end()
