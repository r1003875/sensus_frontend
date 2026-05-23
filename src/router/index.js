import { createRouter, createWebHistory } from 'vue-router'
import Start from '../views/Start.vue'
import UserInfo from '../views/UserInfo.vue'
import ContentWarning from '../views/ContentWarning.vue'
import ScenarioList from '../views/ScenarioList.vue'
import ScenarioIntro from '../views/ScenarioIntro.vue'
import ScenarioScene from '../views/ScenarioScene.vue'
import SafeExit from '../views/SafeExit.vue'
import ScenarioComplete from '../views/ScenarioComplete.vue'
import Code from '../views/Code.vue'
import FAQ from '../views/FAQ.vue'
import TermsOfService from '../views/TermsOfService.vue'
import PrivacyPolicy from '../views/PrivacyPolicy.vue'
import Loading from '../views/ErrorStates/Loading.vue'
import Offline from '../views/ErrorStates/Offline.vue'
import NotFound from '../views/ErrorStates/NotFound.vue'
import ServerError from '../views/ErrorStates/ServerError.vue'
import { useAuthCode } from '@/composables/useAuthCode'

const routes = [
  { path: '/', name: 'start', component: Start, meta: { publicRoute: true } },
  { path: '/gegevens', name: 'gegevens', component: UserInfo },
  { path: '/content-warning', name: 'content-warning', component: ContentWarning },
  { path: '/code', name: 'code', component: Code, meta: { publicRoute: true } },
  { path: '/scenario-lijst', name: 'scenario-lijst', component: ScenarioList },
  { path: '/intro-scenario/:documentId', name: 'intro-scenario', component: ScenarioIntro },
  { path: '/intro-scenario', redirect: '/scenario-lijst' },
  { path: '/scenario/:documentId/scenes/:sceneIndex', name: 'scenario-scene', component: ScenarioScene },
  { path: '/safe-exit', name: 'safe-exit', component: SafeExit },
  { path: '/einde', name: 'einde', component: ScenarioComplete },
  { path: '/faq', name: 'faq', component: FAQ, meta: { publicRoute: true } },
  { path: '/gebruikersvoorwaarden', name: 'gebruikersvoorwaarden', component: TermsOfService, meta: { publicRoute: true } },
  { path: '/privacybeleid', name: 'privacybeleid', component: PrivacyPolicy, meta: { publicRoute: true } },
  { path: '/loading', name: 'loading', component: Loading },
  { path: '/offline', name: 'offline', component: Offline },
  { path: '/404', name: '404', component: NotFound },
  { path: '/405', name: '405', component: ServerError },
  { path: '/:pathMatch(.*)*', redirect: '/404' },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

const { hasValidAuthSession, clearAuthSession } = useAuthCode()

router.beforeEach((to) => {
  const isPublicRoute = to.matched.some((record) => record.meta.publicRoute)

  if (isPublicRoute) {
    return true
  }

  if (!hasValidAuthSession()) {
    clearAuthSession()
    return { name: 'code' }
  }

  return true
})

export default router
