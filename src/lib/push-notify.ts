import { getWebpush } from '@/lib/webpush'
import { query } from '@/lib/db'

interface PushPayload {
  title: string
  body: string
  url: string
  tag?: string
}

interface PushSubscriptionRow {
  id: string
  endpoint: string
  p256dh: string
  auth: string
}

export async function notifyAllSubscribers(payload: PushPayload) {
  const subscriptions = await query<PushSubscriptionRow>('select * from push_subscriptions')
  if (subscriptions.length === 0) return

  const expiredIds: string[] = []
  const webpush = getWebpush()

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
    await query(
      `delete from push_subscriptions where id in (${expiredIds.map(() => '?').join(',')})`,
      expiredIds,
    )
  }
}
