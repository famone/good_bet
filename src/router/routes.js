import VueRouter from 'vue-router'
import Home from '../pages/Home.vue'
import Login from '../pages/Login.vue'
import Signup from '../pages/Signup.vue'
import Policy from '../pages/Policy.vue'
import About from '../pages/About.vue'
import Notfound from '../pages/404.vue'

const routes = [
		{
			path: '/',
			component: Home
		},
		{
			path: '/enter',
			component: Login
		},
		{
			path: '/signup',
			component: Signup
		},
		{
			path: '/policy',
			component: Policy
		},
		{
			path: '/about',
			component: About
		},
		{
			path: '*',
			component: Notfound
		}
	]

export default routes;