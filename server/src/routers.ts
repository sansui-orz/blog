import * as Router from '@koa/router';

const apis = require('./apis');

module.exports = function (app: Router) {
  app.get('/article/:id', apis.article);
};