import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import router from './router/index.js'
import store from './store'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import VueTheMask from 'vue-the-mask'
import Vuelidate from 'vuelidate'
import axios from 'axios'
import ScrollLoader from 'vue-scroll-loader'
import VueScrollTo from 'vue-scrollto'
import * as Sentry from '@sentry/vue'
import { Integrations } from '@sentry/tracing'

import 'swiper/css/swiper.css'
import { API } from './api'
import VueI18n from 'vue-i18n'
import en from './locals/en.json'
import ru from './locals/ru.json'

Vue.use(VueRouter)
Vue.use(Vuelidate)
Vue.use(require('vue-cookies'))
Vue.use(VueAwesomeSwiper)
Vue.use(VueTheMask)
Vue.use(ScrollLoader)
Vue.use(VueI18n)
Vue.use(VueScrollTo)

let currentLocal = process.env.CASINO_APP_I18N_DEFAULT_LOCALE
let localFromStorage = localStorage.getItem('selectedLang')
if (localFromStorage) {
  currentLocal = localFromStorage
}

const i18n = new VueI18n({
  locale: currentLocal,
  messages: {
    'en': en,
    'ru': ru
  }
})

if (localStorage.getItem('player')) {
  let userToken = JSON.parse(localStorage.getItem('userToken'))
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + userToken.userToken
  API.defaults.headers.common['Authorization'] = 'Bearer ' + userToken.userToken
  store.dispatch('auth/getUser')
  store.dispatch('auth/initApp')
} else {
  if (localStorage.getItem('appToken')) {
    let appToken = JSON.parse(localStorage.getItem('appToken'))
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + appToken.appToken
    API.defaults.headers.common['Authorization'] = 'Bearer ' + appToken.appToken
    store.dispatch('auth/getInfo')
    store.dispatch('auth/initApp')
  } else {
    store.dispatch('auth/getAppToken')
    store.dispatch('auth/initApp')
  }
}

const isDev = process.env.NODE_ENV !== 'production'
Vue.config.performance = isDev

if (isDev === false) {
  Sentry.init({
    Vue: Vue,
    dsn: process.env.SENTRY_DSN,
    integrations: [
      new Integrations.BrowserTracing(),
    ],
    tracingOptions: {
      trackComponents: true,
    },
    tracesSampleRate: 1.0,
  })
}

new Vue({
  el: '#app',
  render: h => h(App),
  router,
  store,
  i18n
})

