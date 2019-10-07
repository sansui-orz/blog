module.exports = app => {
  app.once('server', server => {
    console.log('server event is dispatched');
  });

  app.on('error', (err, ctx) => {
    console.log('serror event is dispatched', err, ctx);
  });

  app.on('request', ctx => {
    console.log('request event is dispatched', ctx);
  });

  app.on('response', ctx => {
    const used = Date.now() - ctx.starttime;
    console.log('request event is dispatched', ctx, used);
  });
}