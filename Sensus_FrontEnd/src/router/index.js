import { createRouter, createWebHistory } from 'vue-router'
import StaticScreenView from '../views/StaticScreenView.vue'

const routes = [
  { path: '/', name: 'start', component: StaticScreenView },
  { path: '/gegevens', name: 'gegevens', component: StaticScreenView },
  { path: '/content-warning', name: 'content-warning', component: StaticScreenView },
  { path: '/scenario-lijst', name: 'scenario-lijst', component: StaticScreenView },
  { path: '/intro-scenario', name: 'intro-scenario', component: StaticScreenView },
  { path: '/faq', name: 'faq', component: StaticScreenView },
  { path: '/gebruikersvoorwaarden', name: 'gebruikersvoorwaarden', component: StaticScreenView },
  { path: '/privacybeleid', name: 'privacybeleid', component: StaticScreenView },
  { path: '/safe-exit', name: 'safe-exit', component: StaticScreenView },
  { path: '/einde', name: 'einde', component: StaticScreenView },
  { path: '/loading', name: 'loading', component: StaticScreenView },
  { path: '/offline', name: 'offline', component: StaticScreenView },
  { path: '/405', name: '405', component: StaticScreenView },
  { path: '/404', name: '404', component: StaticScreenView },
  { path: '/:pathMatch(.*)*', redirect: '/404' },
]

export default createRouter({
  history: createWebHistory(),
  routes,
})
