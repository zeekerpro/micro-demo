import Welcome from './pages/Welcome.vue'

const routes = [
  {
    path: '/',
    name: 'welcome',
    component: Welcome
  },
  {
    path: '/menus',
    name: 'menus',
    component: () => import('./pages/Menus.vue')
  }
]

export default routes

