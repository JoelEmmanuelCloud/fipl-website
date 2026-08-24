import { pool } from './db.mjs'

const TABLES = [
  'news_articles',
  'jobs',
  'job_applications',
  'media_kits',
  'contact_submissions',
  'newsletter_subscribers',
  'testimonials',
  'alerts',
  'page_content',
  'push_subscriptions',
]

async function run(label, fn) {
  process.stdout.write(label + ' … ')
  try {
    await fn()
    console.log('ok')
  } catch (e) {
    console.log('FAIL: ' + e.message)
    process.exit(1)
  }
}

for (const table of TABLES) {
  await run(table, async () => {
    await pool.query(`select 1 from ${table} limit 1`)
  })
}

console.log('\nAll tables reachable.')
await pool.end()
