import { createClient } from '@supabase/supabase-js'

async function resilientFetch(input: RequestInfo | URL, init?: RequestInit): Promise<Response> {
  try {
    return await fetch(input, { ...init, cache: 'no-store' })
  } catch (error) {
    return new Response(
      JSON.stringify({
        message: error instanceof Error ? error.message : 'Supabase request failed',
        code: 'SUPABASE_UNREACHABLE',
        details: '',
        hint: '',
      }),
      { status: 503, headers: { 'Content-Type': 'application/json' } },
    )
  }
}

export function createServerClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      auth: { persistSession: false },
      global: {
        fetch: resilientFetch,
      },
    },
  )
}
