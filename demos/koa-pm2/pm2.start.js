const pm2 = require('pm2');

pm2.connect(function(err) {
  if (err) {
    console.error('pm2 err: ', err);
    process.exit(2);
  }

  // pm2.list((err, list) => {
  //   console.log('list', typeof list);
  // });

  pm2.delete('main', () => {
    console.log('main process is be kill.');
  });

  

  pm2.start({
    name: 'main',
    script: 'index.js',
    // exec_mode: 'cluster',
    instances: 1,
    max_memory_restart: '100M',
    watch: true,
  }, (err, app) => {
    if (err) throw err;
    console.log('app', app.use);
  });

  // pm2.restart('main', (err, proc) => {
  //   console.log('restart', err, proc);
  // });
});