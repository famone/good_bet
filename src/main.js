import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import router from './router/index.js'
import store from './store'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import VueTheMask from 'vue-the-mask'
import Vuelidate from 'vuelidate'
import axios from 'axios'


import 'swiper/css/swiper.css'

Vue.use(VueRouter) 
Vue.use(Vuelidate)
Vue.use(require('vue-cookies'))
Vue.use(VueAwesomeSwiper)
Vue.use(VueTheMask)

if(localStorage.getItem('player')){
	let userToken = JSON.parse(localStorage.getItem('userToken'));
 		 axios.defaults.headers.common['Authorization'] = 'Bearer ' + userToken.userToken
 		 store.dispatch("auth/getUser");
}else{
	if (localStorage.getItem('appToken')) {
		 let appToken = JSON.parse(localStorage.getItem('appToken'));
 		 axios.defaults.headers.common['Authorization'] = 'Bearer ' + appToken.appToken
 		 store.dispatch("auth/getInfo");
	}else{
		store.dispatch("auth/getAppToken");
	}
}



	



new Vue({
  el: '#app',
  render: h => h(App),
  router,
  store
})
