import Vue from 'vue';
import VueRouter from 'vue-router';

import pages from './pages.js';

Vue.use(VueRouter);

const routes = [
  { path: '/', component: pages.index },
  { path: '/about', component: pages.about }
];

export default new VueRouter({
  routes
});