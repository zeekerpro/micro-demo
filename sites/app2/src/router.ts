import Header from './pages/Header.vue'

const routes = [
  {
    path: '/',
    name: 'header',
    component: Header
  },
  {
    path: '/footer',
    name: 'footer',
    component: () => import('./pages/Footer.vue')
  }
]

export default routes

