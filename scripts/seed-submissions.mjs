import { randomUUID } from 'crypto'
import { pool, query } from './db.mjs'

const submissions = [
  {
    first_name: 'Adaeze',
    last_name: 'Okonkwo',
    email: 'adaeze.okonkwo@example.com',
    subject: 'General Enquiry',
    message:
      'Please could you share your latest sustainability report? I am preparing a study on power generation in the region.',
    created_at: '2026-06-03T09:15:00Z',
  },
  {
    first_name: 'Tunde',
    last_name: 'Bakare',
    email: 'tunde.bakare@contractco.ng',
    subject: 'Vendor Registration',
    message:
      'We supply industrial spare parts and PPE, and would like to be considered for your approved vendor list. How do we proceed?',
    created_at: '2026-05-30T11:42:00Z',
  },
  {
    first_name: 'Grace',
    last_name: 'Eze',
    email: 'grace.eze@solartech.africa',
    subject: 'Partnership',
    message:
      'Our firm specialises in solar-hybrid generation solutions. We would love to explore a partnership with FIPL on clean energy projects.',
    created_at: '2026-05-25T15:08:00Z',
  },
  {
    first_name: 'Ibrahim',
    last_name: 'Sani',
    email: 'i.sani@newsdaily.ng',
    subject: 'Media & Press',
    message:
      'I am a journalist writing a feature on power generation in the Niger Delta and would appreciate a comment from your team.',
    created_at: '2026-05-20T08:30:00Z',
  },
  {
    first_name: 'Chioma',
    last_name: 'Nwankwo',
    email: 'chioma.nwankwo@gmail.com',
    subject: 'Careers',
    message:
      'I submitted an application for the Control Room Operator role last week and wanted to confirm that it was received. Thank you.',
    created_at: '2026-05-15T13:20:00Z',
  },
  {
    first_name: 'Emeka',
    last_name: 'Obi',
    email: 'emeka.obi@manufacturing.ng',
    subject: 'Eligible Customers',
    message:
      'We operate a manufacturing plant in Port Harcourt and are interested in becoming an eligible customer. What are the requirements?',
    created_at: '2026-05-10T10:05:00Z',
  },
  {
    first_name: 'Sarah',
    last_name: 'Johnson',
    email: 'sarah.johnson@example.com',
    subject: 'General Enquiry',
    message:
      'What are your office opening hours, and is there a number I can call to speak with the customer service team?',
    created_at: '2026-05-05T16:47:00Z',
  },
]

const existing = await query('select message from contact_submissions')
const existingMessages = new Set(existing.map((r) => r.message))
const toInsert = submissions.filter((s) => !existingMessages.has(s.message))

if (toInsert.length === 0) {
  console.log('All submissions already exist — nothing to insert.')
  await pool.end()
  process.exit(0)
}

console.log(`Inserting ${toInsert.length} submission(s)…`)

for (const s of toInsert) {
  await query(
    `insert into contact_submissions
      (id, first_name, last_name, email, subject, message, created_at)
     values (?, ?, ?, ?, ?, ?, ?)`,
    [randomUUID(), s.first_name, s.last_name, s.email, s.subject, s.message, new Date(s.created_at)],
  )
}

console.log(`\nDone — ${toInsert.length} submission(s) inserted:\n`)
toInsert.forEach((s) => console.log(`  ✓ [${s.subject}] ${s.first_name} ${s.last_name}`))

await pool.end()
