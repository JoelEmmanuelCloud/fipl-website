import { createClient } from '@supabase/supabase-js'

const URL = 'https://fjjwqfinfvjmsxbwrxsg.supabase.co'
const SERVICE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZqandxZmluZnZqbXN4YndyeHNnIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3OTk5MzEzNywiZXhwIjoyMDk1NTY5MTM3fQ.EBelQMlLYNcXa9wqO0ZMZ-HY9aNiwasSboo7y7azSqA'

const supabase = createClient(URL, SERVICE_KEY, { auth: { persistSession: false } })

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

await run('news_articles', async () => {
  const { error } = await supabase.from('news_articles').select('id').limit(1)
  if (error) throw error
})

await run('media_kits', async () => {
  const { error } = await supabase.from('media_kits').select('id').limit(1)
  if (error) throw error
})

await run('jobs', async () => {
  const { error } = await supabase.from('jobs').select('id').limit(1)
  if (error) throw error
})

await run('contact_submissions', async () => {
  const { error } = await supabase.from('contact_submissions').select('id').limit(1)
  if (error) throw error
})

await run('newsletter_subscribers', async () => {
  const { error } = await supabase.from('newsletter_subscribers').select('id').limit(1)
  if (error) throw error
})

console.log('\nAll tables reachable.')
