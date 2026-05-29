import { createClient } from '@supabase/supabase-js'
import { config } from 'dotenv'

config({ path: '.env.local' })

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { persistSession: false } },
)

const BUCKETS = ['news-images', 'media-kit-assets']

console.log('Checking buckets...')
for (const name of BUCKETS) {
  const { data, error } = await supabase.storage.getBucket(name)
  if (error) {
    console.log(`  [MISSING] ${name} — creating...`)
    const { error: ce } = await supabase.storage.createBucket(name, { public: true })
    if (ce) {
      console.error('  FAIL:', ce.message)
      process.exit(1)
    }
    console.log(`  [CREATED] ${name}`)
  } else {
    console.log(`  [OK] ${name} — public: ${data.public}`)
    if (!data.public) {
      await supabase.storage.updateBucket(name, { public: true })
      console.log(`  [UPDATED] ${name} set to public`)
    }
  }
}

console.log('\nTesting upload → public URL → delete...')
const pixel = Buffer.from(
  'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==',
  'base64',
)

for (const bucket of BUCKETS) {
  const path = `_verify-${Date.now()}.png`

  const { error: upErr } = await supabase.storage
    .from(bucket)
    .upload(path, pixel, { contentType: 'image/png' })
  if (upErr) {
    console.error(`  [FAIL] upload to ${bucket}:`, upErr.message)
    process.exit(1)
  }

  const { data: urlData } = supabase.storage.from(bucket).getPublicUrl(path)
  const res = await fetch(urlData.publicUrl)
  if (!res.ok) {
    console.error(`  [FAIL] public URL not reachable (${res.status})`)
    process.exit(1)
  }

  await supabase.storage.from(bucket).remove([path])
  console.log(`  [PASS] ${bucket}: upload → public read → delete ok`)
  console.log(`         ${urlData.publicUrl.replace(path, '<filename>')}`)
}

console.log('\nStorage is fully operational.')
