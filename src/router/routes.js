import VueRouter from 'vue-router'
import store from '../store'
import Home from '../pages/Home.vue'
import Login from '../pages/Login.vue'
import Signup from '../pages/Signup.vue'
import Policy from '../pages/Policy.vue'
import About from '../pages/About.vue'
import Notfound from '../pages/404.vue'
import Faq from '../pages/Faq.vue'
import DemoGame from '../pages/DemoGame.vue'
import News from '../pages/News.vue'
import Newspage from '../pages/Newspage.vue'
import groupPage from '../pages/groupPage.vue'
import Profile from '../pages/account/Profile.vue'
import RealGame from '../pages/RealGame.vue'

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
			path: '/faq',
			component: Faq
		},
		{
			path: '/news',
			component: News
		},
		{
			path: '/news/:id',
			component: Newspage
		},
		{
			path: '/game-groups/:id',
			component: groupPage,
			props: true
		},
		{
			path: '/demo-game/:id',
			component: DemoGame
		},
		{
			path: '/real-game/:id',
			component: RealGame
		},
		{
			path: '/profile',
			component: Profile,
			beforeEnter: (to, from, next) => {

				console.log(store.getters["auth/getAuthenticated"])

				

				if(store.getters["auth/getAuthenticated"]){
					next()
				}else{
					if (to.path != "/enter") {
						next("/enter")
					}
					else {
						next()
					}
				}
				
			}
		},
		{
			path: '*',
			component: Notfound
		}
	]

export default routes;