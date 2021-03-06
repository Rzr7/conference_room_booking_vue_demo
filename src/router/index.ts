import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import ManageRoomsView from '@/views/ManageRoomsView.vue';
import ConferencesListView from '@/views/ConferencesListView.vue';
import ConferenceView from '@/views/ConferenceView.vue';
import useAuthStore from '@/store/AuthStore';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'conferences',
    component: ConferencesListView,
    meta: { requiresAuth: true },
  },
  {
    path: '/room',
    name: 'manage-rooms',
    component: ManageRoomsView,
    meta: { requiresAuth: true },
  },
  {
    path: '/conference/:conferenceId',
    name: 'conference-view',
    component: ConferenceView,
    meta: { requiresAuth: true },
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */ '@/views/LoginView.vue'),
    meta: { requiresAuth: false, loginPage: true },
  },
  {
    path: '/logout',
    name: 'logout',
    component: () => import(/* webpackChunkName: "login" */ '@/views/LoginView.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

// eslint-disable-next-line consistent-return
router.beforeEach((to) => {
  const authStore = useAuthStore();

  if (to.path === '/logout') {
    authStore.logout();
    return '/login';
  }

  if (to.meta.requiresAuth && !authStore.isLoggedIn) {
    return '/login';
  }
  if (to.meta.loginPage && authStore.isLoggedIn) {
    return '/';
  }
});

export default router;
