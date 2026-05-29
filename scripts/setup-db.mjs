import { createClient } from '@supabase/supabase-js'
import { config } from 'dotenv'

config({ path: '.env.local' })

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { persistSession: false } },
)

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
