var ports = [];
self.addEventListener('connect', function (e) {
    const port = e.ports[0];
    ports.push(port);
    port.addEventListener('message', function (event) {
      ports.forEach(function(port) {
        port && port.postMessage(event.data);
      });
    });
    port.start();
});
