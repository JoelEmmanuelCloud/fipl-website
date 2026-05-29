import { createClient } from '@supabase/supabase-js'
import { config } from 'dotenv'

config({ path: '.env.local' })

const anon = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  { auth: { persistSession: false } },
)

const srv = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { persistSession: false } },
)

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

console.log('\nPublic reads (anon key):')

await check('news_articles readable', async () => {
  const { data, error } = await anon.from('news_articles').select('slug').order('date_iso', { ascending: false })
  if (error) throw error
  return `${data.length} articles`
})

await check('latest article slug', async () => {
  const { data, error } = await anon.from('news_articles').select('slug').order('date_iso', { ascending: false }).limit(1).single()
  if (error) throw error
  return data.slug
})

await check('jobs readable', async () => {
  const { data, error } = await anon.from('jobs').select('id')
  if (error) throw error
  return `${data.length} jobs`
})

await check('media_kits readable', async () => {
  const { data, error } = await anon.from('media_kits').select('id')
  if (error) throw error
  return `${data.length} media kits`
})

console.log('\nAdmin writes (service role):')

await check('insert + delete test row in contact_submissions', async () => {
  const { data, error } = await srv.from('contact_submissions')
    .insert({ first_name: 'Test', last_name: 'User', email: 'test@verify.internal', message: 'verify' })
    .select('id')
    .single()
  if (error) throw error
  await srv.from('contact_submissions').delete().eq('id', data.id)
  return 'write + delete ok'
})

await check('newsletter upsert', async () => {
  await srv.from('newsletter_subscribers').upsert({ email: 'verify@internal.test' }, { onConflict: 'email' })
  await srv.from('newsletter_subscribers').delete().eq('email', 'verify@internal.test')
  return 'upsert + delete ok'
})

console.log('\nStorage:')

await check('news-images bucket public', async () => {
  const { data } = srv.storage.from('news-images').getPublicUrl('test.png')
  if (!data?.publicUrl) throw new Error('no public URL')
  return 'public URL resolvable'
})

await check('media-kit-assets bucket public', async () => {
  const { data } = srv.storage.from('media-kit-assets').getPublicUrl('test.png')
  if (!data?.publicUrl) throw new Error('no public URL')
  return 'public URL resolvable'
})

console.log(`\n${pass + fail} checks — ${pass} passed, ${fail} failed\n`)
if (fail > 0) process.exit(1)
