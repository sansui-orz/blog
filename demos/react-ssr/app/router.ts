import renderHome from './controller/home';
import renderAbout from './controller/about';

export default function Router(router) {
  router.get('/', renderHome);
  router.get('/about', renderAbout);
  router.get('/v2', (ctx) => {
    ctx.body = 'home';
  });
};