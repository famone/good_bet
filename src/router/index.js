import VueRouter from 'vue-router'
import routes from './routes.js';

import store from '../store'
import {CasinoLocalStorage} from "../CasinoLocalStorage";

const router = new VueRouter({
	routes,
	mode: 'history'
});


router.beforeEach((to, from, next) => {
	if (store.getters['auth/getAuthenticated'] === false && !CasinoLocalStorage.getGuest()) {
		store.dispatch('auth/loadGuestToken')
	}

	if (to.matched.some(record => record.meta.playerAuth)) {
		if (store.getters['auth/getAuthenticated'] === false) {
			if (to.path !== '/enter') {
				next('/enter')
			}
		}
	}

	if (to.matched.some(record => record.meta.guest)) {
		if (store.getters['auth/getAuthenticated']) {
			next('/')
		}
	}
	next()
})


export default router
