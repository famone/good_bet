import VueRouter from 'vue-router'
import routes from './routes.js';

import store from '../store'
import axios from 'axios'

const router = new VueRouter({
    routes,
    mode: 'history',
    scrollBehavior(to, from, savedPosition) {
        return { x: 0, y: 0 }
    }
});


router.beforeEach((to, from, next) => {


	if (localStorage.getItem('appToken')) {

		 let appToken = JSON.parse(localStorage.getItem('appToken'));

 		 axios.defaults.headers.common['Authorization'] = 'Bearer ' + appToken.appToken

 		 next()
	}else{
		store.dispatch("auth/getAppToken");
		next()

	}
    
})




export default router
