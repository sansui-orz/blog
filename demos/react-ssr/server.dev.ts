const Koawebpack = require('koa-webpack');
const webpackConfig = require('./webpack/webpack.config.js');

module.exports = async function startDevServer(app) {
  const middleware = await Koawebpack({
    config: webpackConfig[0],
    devMiddleware: {
      publicPath: '/build/',
      serverSideRender: true,
      writeToDisk: true,
    }
  });
  app.use(middleware);
};