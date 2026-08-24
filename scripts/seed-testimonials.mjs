import { randomUUID } from 'crypto'
import { pool, query } from './db.mjs'

const testimonials = [
  {
    quote:
      "FIPL's commitment to reliable power generation has been transformational. Their professionalism and expertise ensure seamless project execution every time.",
    name: 'Sarah L.',
    role: 'Operations Lead, Partner Firm',
    is_active: true,
  },
  {
    quote:
      'Working with FIPL over the years has shown us what true dedication to power reliability looks like. They have consistently exceeded expectations on every project.',
    name: 'James T.',
    role: 'Chief Executive, Red Button',
    is_active: true,
  },
  {
    quote:
      'The level of technical expertise and customer focus that FIPL brings to the table is unmatched in the Nigerian power sector. A truly world-class organisation.',
    name: 'Chukwudi O.',
    role: 'Director, Lagos Industries Ltd',
    is_active: true,
  },
]

const existing = await query('select name from testimonials')
const existingNames = new Set(existing.map((r) => r.name))
const toInsert = testimonials.filter((t) => !existingNames.has(t.name))

if (toInsert.length === 0) {
  console.log('All testimonials already exist — nothing to insert.')
  await pool.end()
  process.exit(0)
}

console.log(`Inserting ${toInsert.length} testimonial(s)…`)

for (const t of toInsert) {
  await query(
    'insert into testimonials (id, quote, name, role, is_active) values (?, ?, ?, ?, ?)',
    [randomUUID(), t.quote, t.name, t.role, t.is_active],
  )
}

console.log(`\nDone — ${toInsert.length} testimonial(s) inserted:\n`)
toInsert.forEach((t) => console.log(`  ✓ ${t.name} — ${t.role}`))

await pool.end()
