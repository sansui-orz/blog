import * as Koa from 'koa';
import * as Router from '@koa/router';

const apis = require('./apis');

module.exports = function (app: Koa, router: Router) {
  router.get('/', apis.home);
  // router.get('/article/:id', apis.article);
  // app.use((ctx: Koa.Context, next: Koa.Next) => {
  //   next();
  //   if (ctx.status === 404) {
  //     ctx.redirect('/');
  //   }
  // });
};