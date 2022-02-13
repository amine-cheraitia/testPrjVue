import { createRouter, createWebHistory } from 'vue-router';
import CoachsList from './pages/coaches/CoachesList.vue';
import CoachDetail from './pages/coaches/CoachDetail.vue';
import CoachRegister from './pages/coaches/CoachRegister.vue';
import ContactCoach from './pages/requests/ContactCoach.vue';
import RequestsReceived from './pages/requests/RequestsReceived.vue';
import notFound from './pages/404.vue';
import userAth from './pages/auth/UserAuth.vue';
import store from './store/index.js';

const route = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/coaches' },
    { path: '/coaches', component: CoachsList },
    {
      path: '/coaches/:id',
      component: CoachDetail,
      props: true,
      children: [{ path: 'contact', component: ContactCoach }],
    },
    {
      path: '/register',
      component: CoachRegister,
      meta: { requiersAuth: true },
    },
    {
      path: '/requests',
      component: RequestsReceived,
      meta: { requiersAuth: true },
    },
    { path: '/:notFound(.*)', component: notFound },
    { path: '/auth', component: userAth, meta: { requiersUnauth: true } },
  ],
});

route.beforeEach(function (to, _, next) {
  if (to.meta.requiersAuth && !store.getters.isAuthenticated) {
    next('/auth');
  } else if (to.meta.requiersUnauth && store.getters.isAuthenticated) {
    next('/coaches');
  } else {
    next();
  }
});

export default route;
