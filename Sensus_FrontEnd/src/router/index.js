import { createRouter, createWebHistory } from 'vue-router'
import Start from '../views/Start.vue'
import UserInfo from '../views/UserInfo.vue'
import ContentWarning from '../views/ContentWarning.vue'
import ScenarioList from '../views/ScenarioList.vue'
import ScenarioIntro from '../views/ScenarioIntro.vue'
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

const routes = [
  { path: '/', name: 'start', component: Start },
  { path: '/gegevens', name: 'gegevens', component: UserInfo },
  { path: '/content-warning', name: 'content-warning', component: ContentWarning },
  { path: '/code', name: 'code', component: Code },
  { path: '/scenario-lijst', name: 'scenario-lijst', component: ScenarioList },
  { path: '/intro-scenario', name: 'intro-scenario', component: ScenarioIntro },
  { path: '/safe-exit', name: 'safe-exit', component: SafeExit },
  { path: '/einde', name: 'einde', component: ScenarioComplete },
  { path: '/faq', name: 'faq', component: FAQ },
  { path: '/gebruikersvoorwaarden', name: 'gebruikersvoorwaarden', component: TermsOfService },
  { path: '/privacybeleid', name: 'privacybeleid', component: PrivacyPolicy },
  { path: '/loading', name: 'loading', component: Loading },
  { path: '/offline', name: 'offline', component: Offline },
  { path: '/404', name: '404', component: NotFound },
  { path: '/405', name: '405', component: ServerError },
  { path: '/:pathMatch(.*)*', redirect: '/404' },
]

export default createRouter({
  history: createWebHistory(),
  routes,
})
