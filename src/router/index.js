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
		let userToken = JSON.parse(localStorage.getItem('userToken'))
		API.defaults.headers.common['Authorization'] = 'Bearer ' + userToken.userToken
		store.dispatch('auth/getUser')
		next()
	} else {
		if (localStorage.getItem('appToken')) {
			let appToken = JSON.parse(localStorage.getItem('appToken'))
			API.defaults.headers.common['Authorization'] = 'Bearer ' + appToken.appToken
			store.dispatch('auth/getInfo')
			next()
		} else {
			store.dispatch('auth/getAppToken')
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
		console.log(store.getters['auth/getAuthenticated'])
		console.log(store.getters['auth/getAuthenticated'] === false)
		if (store.getters['auth/getAuthenticated']) {
			next('/')
		}
	}
	next()

	// if (localStorage.getItem('appToken')) {

	// 	 let appToken = JSON.parse(localStorage.getItem('appToken'));

 // 		 axios.defaults.headers.common['Authorization'] = 'Bearer ' + appToken.appToken

 // 		 next()
	// }else{
	// 	store.dispatch("auth/getAppToken");
	// 	next()

	// }
    
})


export default router
