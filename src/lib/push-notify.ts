import { webpush } from '@/lib/webpush'
import { createServerClient } from '@/lib/supabase-server'

interface PushPayload {
  title: string
  body: string
  url: string
  tag?: string
}

export async function notifyAllSubscribers(payload: PushPayload) {
  const supabase = createServerClient()
  const { data: subscriptions } = await supabase.from('push_subscriptions').select('*')
  if (!subscriptions || subscriptions.length === 0) return

  const expiredIds: string[] = []

  await Promise.allSettled(
    subscriptions.map(async (sub) => {
      try {
        await webpush.sendNotification(
          { endpoint: sub.endpoint, keys: { p256dh: sub.p256dh, auth: sub.auth } },
          JSON.stringify({ ...payload, icon: '/images/sustainability/logoimage.png' }),
        )
      } catch (err: unknown) {
        const status = (err as { statusCode?: number }).statusCode
        if (status === 410 || status === 404) {
          expiredIds.push(sub.id)
        }
      }
    }),
  )

  if (expiredIds.length > 0) {
    await supabase.from('push_subscriptions').delete().in('id', expiredIds)
  }
}
