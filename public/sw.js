self.addEventListener('push', function (event) {
  if (!event.data) return
  const data = event.data.json()
  event.waitUntil(
    self.registration.showNotification(data.title, {
      body: data.body,
      icon: data.icon || '/images/sustainability/logoimage.png',
      badge: '/images/sustainability/logoimage.png',
      tag: data.tag || 'fipl-notification',
      data: { url: data.url || '/' },
    }),
  )
})

self.addEventListener('notificationclick', function (event) {
  event.notification.close()
  event.waitUntil(
    clients
      .matchAll({ type: 'window', includeUncontrolled: true })
      .then(function (clientList) {
        const url = event.notification.data.url
        for (const client of clientList) {
          if (client.url === url && 'focus' in client) return client.focus()
        }
        if (clients.openWindow) return clients.openWindow(url)
      }),
  )
})
