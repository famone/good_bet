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
import Mybonuses from '../pages/account/Mybonuses.vue'
import Failed from '../pages/Failed.vue'
import Succed from '../pages/Succed.vue'
import Favorite from '../pages/account/Favorite.vue'
import Documents from '../pages/account/Documents.vue'
import Accounts from '../pages/account/Accounts.vue'
import Recovery from '../pages/Recovery.vue'
import Newpass from '../pages/Newpass.vue'
import LoginSocialCallback from '../pages/LoginSocialCallback'
import SocialCallback from '../pages/account/SocialCallback'
import Socials from '../pages/account/Socials'
import BonusList from '../pages/bonuses/List'
import Bonus from "../pages/bonuses/Bonus";

const routes = [
	{
		path: '/',
		component: Home
	},
	{
		path: '/enter',
		component: Login,
		meta: {
			guest: true
		}
	},
	{
		path: '/enter/social',
		component: LoginSocialCallback,
		meta: {
			guest: true
		}
	},
	{
		path: '/recovery',
		component: Recovery,
		meta: {
			guest: true
		}
	},
	{
		path: '/new-password',
		component: Newpass,
		meta: {
			guest: true
		}
	},
	{
		path: '/signup',
		component: Signup,
		meta: {
			guest: true
		}
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
		component: Failed,
		meta: {
			playerAuth: true
		}
	},
	{
		path: '/success',
		component: Succed,
		meta: {
			playerAuth: true
		}
	},
	{
		path: '/news',
		component: News
	},
	{
		path: '/favorite',
		component: Favorite
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
		meta: {
			playerAuth: true
		}
	},
	{
		path: '/profile',
		component: Profile,
		meta: {
			playerAuth: true
		}
	},
	{
		path: '/cash-withdrawal',
		component: Withdrawal,
		meta: {
			playerAuth: true
		}
	},
	{
		path: '/deposit',
		component: Deposit,
		meta: {
			playerAuth: true
		}
	},
	{
		path: '/documents',
		component: Documents,
		meta: {
			playerAuth: true
		}
	},
	{
		path: '/accounts',
		component: Accounts,
		meta: {
			playerAuth: true
		}
	},
	{
		path: '/my-bonuses',
		component: Mybonuses,
		meta: {
			playerAuth: true
		}
	},
	{
		path: '/transactions',
		component: Transactions,
		meta: {
			playerAuth: true
		}
	},
	{
		path: '/social/callback',
		component: SocialCallback,
	},
	{
		path: '/account/socials',
		component: Socials,
		name: 'account_socials'
	},
	{
		path: '/bonuses',
		component: BonusList,
		name: 'bonus_list'
	},
	{
		path: '/bonuses/:id',
		component: Bonus,
		name: 'bonus_page'
	},
	{
		path: '*',
		component: Notfound
	}
]

export default routes;