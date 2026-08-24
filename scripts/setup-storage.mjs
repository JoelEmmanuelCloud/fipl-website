import { createClient } from '@supabase/supabase-js'
import { config } from 'dotenv'

config({ path: '.env.local' })

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { persistSession: false } },
)

async function ensureBucket(name) {
  const { data: existing } = await supabase.storage.getBucket(name)
  if (existing) {
    console.log(`  bucket '${name}' already exists`)
    return
  }
  const { error } = await supabase.storage.createBucket(name, { public: true })
  if (error) throw new Error(`Failed to create '${name}': ${error.message}`)
  console.log(`  bucket '${name}' created`)
}

console.log('Storage buckets:')
await ensureBucket('news-images')
await ensureBucket('media-kit-assets')
console.log('Done.')
