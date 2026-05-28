import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  'https://fjjwqfinfvjmsxbwrxsg.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZqandxZmluZnZqbXN4YndyeHNnIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3OTk5MzEzNywiZXhwIjoyMDk1NTY5MTM3fQ.EBelQMlLYNcXa9wqO0ZMZ-HY9aNiwasSboo7y7azSqA',
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
