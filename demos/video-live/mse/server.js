const http = require('http');
const fs = require('fs');

const port = 3001;

const server = http.createServer((req, res) => {
  if (/\.mp4$/.test(req.url)) {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/octet-stream');
    const stream = fs.createReadStream(__dirname + '/frag_bunny.mp4');
    stream.pipe(res);
  } else {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.end(fs.readFileSync(__dirname + '/index.html'));
  }
});

server.listen(port, () => {
  console.log('open: http://localhost:' + port);
});