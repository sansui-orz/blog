import * as Koawebpack from 'koa-webpack';
import webpackConfig from './webpack/webpack.config.js';

export default async function startDevServer(app) {
  const middleware = await Koawebpack({
    config: webpackConfig[0],
    devMiddleware: {
      publicPath: '/build/',
      serverSideRender: true,
      writeToDisk: true,
    }
  });
  middleware.devMiddleware.waitUntilValid(async () => {
    console.log('open http://127.0.0.1:3001');
  });
  app.use(middleware);

  const middleware2 = await Koawebpack({
    config: webpackConfig[1],
    devMiddleware: {
      publicPath: '/build/',
      serverSideRender: true,
      writeToDisk: true,
    }
  });
  app.use(middleware2);
};