this.addEventListener('message', function(e) {
  e.waitUntil(
    this.clients.matchAll().then(function(clients) {
      if (!clients || clients.length === 0) {
        return;
      }
      clients.forEach(function(client) {
        client.postMessage(e.data);
      });
    })
  )
});