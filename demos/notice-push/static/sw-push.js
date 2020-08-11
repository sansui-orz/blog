self.addEventListener('push', function(event) {
  const payload = event.data ? event.data.text() : 'no layload';
  event.waitUntil(
    self.registration.showNotification('Service Worker Notification.', {
      body: payload,
    })
  )
});