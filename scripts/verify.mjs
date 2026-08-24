import { randomUUID } from 'crypto'
import { mkdir, access } from 'fs/promises'
import path from 'path'
import { pool, query } from './db.mjs'

let pass = 0
let fail = 0

async function check(label, fn) {
  try {
    const result = await fn()
    console.log(`  [PASS] ${label}${result ? ': ' + result : ''}`)
    pass++
  } catch (e) {
    console.log(`  [FAIL] ${label}: ${e.message}`)
    fail++
  }
}

console.log('\nPublic reads:')

await check('news_articles readable', async () => {
  const rows = await query('select slug from news_articles order by date_iso desc')
  return `${rows.length} articles`
})

await check('latest article slug', async () => {
  const rows = await query('select slug from news_articles order by date_iso desc limit 1')
  if (rows.length === 0) throw new Error('no articles found')
  return rows[0].slug
})

await check('jobs readable', async () => {
  const rows = await query('select id from jobs')
  return `${rows.length} jobs`
})

await check('media_kits readable', async () => {
  const rows = await query('select id from media_kits')
  return `${rows.length} media kits`
})

console.log('\nAdmin writes:')

await check('insert + delete test row in contact_submissions', async () => {
  const id = randomUUID()
  await query(
    `insert into contact_submissions (id, first_name, last_name, email, message)
     values (?, 'Test', 'User', 'test@verify.internal', 'verify')`,
    [id],
  )
  await query('delete from contact_submissions where id = ?', [id])
  return 'write + delete ok'
})

await check('newsletter upsert', async () => {
  const id = randomUUID()
  await query(
    `insert into newsletter_subscribers (id, email) values (?, 'verify@internal.test')
     on duplicate key update email = email`,
    [id],
  )
  await query('delete from newsletter_subscribers where email = ?', ['verify@internal.test'])
  return 'upsert + delete ok'
})

console.log('\nLocal file storage:')

await check('public/uploads is writable', async () => {
  const dir = path.join(process.cwd(), 'public', 'uploads', 'verify')
  await mkdir(dir, { recursive: true })
  await access(dir)
  return dir
})

console.log(`\n${pass + fail} checks — ${pass} passed, ${fail} failed\n`)
await pool.end()
if (fail > 0) process.exit(1)
