import Vue from "vue";
import App from "./App";
import router from "./router";
import store from "./store";
import VueI18n from "vue-i18n";
import en from "./locals/en.json";
import ru from "./locals/ru.json";
import * as Sentry from "@sentry/vue";
import {Integrations} from "@sentry/tracing";
import VueRouter from "vue-router";
import Vuelidate from "vuelidate";
import ScrollLoader from 'vue-scroll-loader'
import VueAwesomeSwiper from "vue-awesome-swiper";
import VueTheMask from "vue-the-mask";
import VueScrollTo from "vue-scrollto";
import Toasted from "vue-toasted";
import checkView from "vue-check-view";
import AuthException from "./store/AuthException";
import {CasinoLocalStorage} from "./CasinoLocalStorage";
import AccessDeniedException from "./store/AccessDeniedException";
import VueSocketIO from 'vue-socket.io'
import io from 'socket.io-client'

export default class Casino {
	constructor() {
		this.loadModules()
		this.sentryInit()

		if (CasinoLocalStorage.getPlayer()) {
			store.dispatch('player/loadCurrent').then(() => {
				this.intiApplication()
			}).catch(error => {
				if (error instanceof AuthException) {
					this.intiApplication()
				} else if(error instanceof AccessDeniedException) {
					store.dispatch('auth/setAuthenticated', false, {root: true}).then(() => {
						CasinoLocalStorage.deleteUsers()
						this.intiApplication()
					})

				}
			})
		}
		else {
			this.intiApplication()
		}

	}
	loadModules() {
		Vue.use(VueRouter)
		Vue.use(Vuelidate)
		Vue.use(require('vue-cookies'))
		Vue.use(VueAwesomeSwiper)
		Vue.use(VueTheMask)
		Vue.use(ScrollLoader)
		Vue.use(VueI18n)
		Vue.use(VueScrollTo)
		Vue.use(Toasted)
		Vue.use(checkView)
		Vue.use(this.buildSocketObject())
	}
	intiApplication() {
		const i18n = this.getI18n()
		new Vue({
			el: '#app',
			render: h => h(App),
			router,
			store,
			i18n
		})
	}
	getI18n() {
		let currentLocal = process.env.CASINO_APP_I18N_DEFAULT_LOCALE
		let localFromStorage = CasinoLocalStorage.getSelectedLang()
		if (localFromStorage) {
			currentLocal = localFromStorage
		}

		store.dispatch('lang/setCurrent', CasinoLocalStorage.getSelectedLang())

		return new VueI18n({
			locale: currentLocal,
			messages: {
				'en': en,
				'ru': ru
			}
		})
	}
	buildSocketObject() {
		return new VueSocketIO({
			debug: true,
			connection: io(process.env.CASINO_SOCKET_URL, {
				transports: ['websocket'],
				upgrade: false,
			}),
			vuex: {
				store,
				actionPrefix: "SOCKET_",
				mutationPrefix: "SOCKET_"
			}
		})
	}
	sentryInit() {
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
	}
}