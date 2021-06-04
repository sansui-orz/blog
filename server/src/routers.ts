import * as Koa from 'koa';
import * as Router from '@koa/router';

const apis = require('./apis');

module.exports = function (app: Koa, router: Router) {
  router.get('/', apis.home);
  router.get('/restart', apis.restart);
};