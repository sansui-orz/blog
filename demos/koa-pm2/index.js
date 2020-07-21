const Koa = require('koa');

const app = new Koa();

app.use(function(ctx) {
  ctx.body = 'hello world! 121';
});

app.listen(3000, function(err) {
  if (err) {
    console.error(err);
  } else {
    console.log('open http://127.0.0.1:3000');
  }
});