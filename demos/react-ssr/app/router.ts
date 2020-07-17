const home = require('./controller/home');

module.exports = (router) => {
  router.get('/', home.renderHome);
  router.get('/v2', (ctx) => {
    ctx.body = 'home';
  });
};