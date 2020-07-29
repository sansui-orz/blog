import renderHome from './controller/home';
import renderAbout from './controller/about';
import renderLint from './controller/list';

export default function Router(router) {
  router.get('/', renderHome);
  router.get('/about', renderAbout);
  router.get('/list', renderLint);
  router.get('/v2', (ctx) => {
    ctx.body = 'home';
  });
};