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
import Withdrawal from '../pages/account/Withdrawal.vue'
import Transactions from '../pages/account/Transactions.vue'
import Deposit from '../pages/account/Deposit.vue'
import Failed from '../pages/Failed.vue'
import Succed from '../pages/Succed.vue'
import Documents from '../pages/account/Documents.vue'

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
			path: '/fail',
			component: Failed
		},
		{
			path: '/success',
			component: Succed
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
			component: RealGame,
			beforeEnter: (to, from, next) => {

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
			path: '/profile',
			component: Profile,
			beforeEnter: (to, from, next) => {

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
			path: '/cash-withdrawal',
			component: Withdrawal,
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
			path: '/deposit',
			component: Deposit,
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
			path: '/documents',
			component: Documents,
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
			path: '/transactions',
			component: Transactions,
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