import VueRouter from 'vue-router'
import routes from './routes.js';

import store from '../store'
import { API } from '../api'

const router = new VueRouter({
    routes,
    mode: 'history',
    scrollBehavior(to, from, savedPosition) {
        return { x: 0, y: 0 }
    }
});


router.beforeEach((to, from, next) => {
	if (localStorage.getItem('player')) {
		store.dispatch('auth/getUser')
		store.dispatch('auth/initApp')
		next()
	} else {
		if (localStorage.getItem('appToken')) {
			store.dispatch('auth/getInfo')
			next()
		} else {
			next()
		}
	}

	/*
  For auth player
  meta: {
    playerAuth: true
  }
 */
	if (to.matched.some(record => record.meta.playerAuth)) {
		if (store.getters['auth/getAuthenticated'] === false) {
			if (to.path != '/enter') {
				next('/enter')
			}
		}
	}
	/*
    For guest
    meta: {
      guest: true
    }
   */
	if (to.matched.some(record => record.meta.guest)) {
		if (store.getters['auth/getAuthenticated']) {
			next('/')
		}
	}
	next()
})


export default router
