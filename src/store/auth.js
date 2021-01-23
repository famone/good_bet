
import axios from 'axios'

const auth = {
	namespaced: true,
	state: {
		credintals: {
			grant_type: "client_credentials",
		    scope:"guest:default"
		},
		authenticated: false,
		games: [],
		regFields: [],
		currency: [],
		faq: '',
		slider: [],
		news: [],
		groups: [],
		player: null,
		timezones: [],
		countries: []
  	},
	mutations: {
		SET_GAMES(state, payload){
			state.games = payload
		},
		SET_REG_FIELDS(state, payload){
			state.regFields = payload
		},
		SET_CURRENCY(state, payload){
			state.currency = payload
		},
		SET_FAQ(state, payload){
			state.faq = payload
		},
		SET_SLIDER(state, payload){
			state.slider = payload
		},
		SET_NEWS(state, payload){
			state.news = payload
		},
		SET_GROUPS(state, payload){
			state.groups = payload
		},
		SET_PLAYER(state, payload){
			state.player = payload
		},
		SET_TIMEZONES(state, payload){
			state.timezones = payload
		},
		SET_COUNTRIES(state, payload){
			state.countries = payload
		},
		LOG_OUT(state){
			state.player = null
		},
		SET_FIELD(state, payload){
			state.player[payload.name] = payload.value
		},
		CHANGE_AUTH(state, payload){
			state.authenticated = payload
		}
	},
	actions: {
		getAppToken({commit, state, dispatch}){
			let config = {
			        headers: {
			          Authorization: 'Basic ZnJvbnRfYmVhcmVyOg==',
			        } 
			    }

			axios
	  		.post('http://api.casinoplatform.site/v3/oauth2/token', state.credintals, config)
	  		.then(response => {
	  			let token = response.data.access_token

	  			var object = {appToken: token, timestamp: new Date().getTime()}
				localStorage.setItem("appToken", JSON.stringify(object));


				axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
				// alert('Bearer ' + token)

				dispatch("loadNews")
		 		dispatch("loadSlider")
		 		// dispatch("loadTimezones")

	  		})


	  		




		},
		getUser({commit, dispatch, state}){
			
			let userToken = JSON.parse(localStorage.getItem('userToken'));

		 	axios.defaults.headers.common['Authorization'] = 'Bearer ' + userToken.userToken

		 	commit('CHANGE_AUTH', true)

		 	axios
		 	.get('http://api.casinoplatform.site/v3/players?expand=avatars,accounts,country,timezone')
		 	.then(response =>{
		 		console.log(response.data)
		 		commit('SET_PLAYER', response.data[0])
		 		localStorage.setItem("player", JSON.stringify(response.data[0]));

		 	})








		 	// axios
	  	// 	.get('http://api.casinoplatform.site/v3/messages')
	  	// 	.then(response => {
	  	// 		console.log(response)
	  	// 	})

		},
         getInfo({commit, dispatch, state}){


         	dispatch("loadNews")
		 	dispatch("loadSlider")
		 	// dispatch("loadTimezones")

         
	        axios
	        .get('http://api.casinoplatform.site/v3/games?expand=details,launch_types,images,type,provider,canonical')
	        .then(res =>{
	          commit('SET_GAMES', res.data)
	        })

	        axios
			.get('http://api.casinoplatform.site/v3/faq-items')
			.then(res => {
				// console.log(res.data) 
				commit('SET_FAQ', res.data)
			})


	    
	        axios
			.get('http://api.casinoplatform.site/v3/player-forms')
			.then(res => {
				console.log(res.data)
				commit('SET_REG_FIELDS', res.data)
			})

			axios
			.get('http://api.casinoplatform.site/v3/games?type_id=1')
			.then(res => {
				// console.log(res.data)
			})


			

			axios
			.get('http://api.casinoplatform.site/v3/payment-currencies')
			.then(res => {
				console.log(res.data)
				commit('SET_CURRENCY', res.data)
			})


			// получаем id всех групп

			axios
			.get('http://api.casinoplatform.site/v3/game-groups?place_code=headline&expand=images,platform,place_code')
			.then(res => {
				commit('SET_GROUPS', res.data)
			})

			// // таймзоны
			// axios
		 // 	.get('http://api.casinoplatform.site/v3/timezones?per-page=400')
		 // 	.then(res =>{
		 // 		commit('SET_TIMEZONES', res.data)
		 // 	})

		 	// страны
			// axios
		 // 	.get('http://api.casinoplatform.site/v3/countries?per-page=400')
		 // 	.then(res =>{
		 // 		commit('SET_COUNTRIES', res.data)
		 // 	})

			            
        },
        loadNews({commit}){
        	axios
			.get('http://api.casinoplatform.site/v3/news')
			.then(response =>{
				commit('SET_NEWS', response.data)
			})
        },
        loadSlider({commit}){
        	axios
	        .get('http://api.casinoplatform.site/v3/sliders')
	        .then(res =>{
	          commit('SET_SLIDER', res.data)
	        })
        },
        logOut({commit, state}){
        	commit('CHANGE_AUTH', false)
        	localStorage.removeItem("player");
        	localStorage.removeItem("userToken");
        	commit('LOG_OUT')
        },
        CHANGE_FIELD({commit}, payload){
        	// console.log(payload)
        	commit('SET_FIELD', payload)
        },
        loadTimezones({commit}){
        	axios
		 	.get('http://api.casinoplatform.site/v3/timezones?per-page=400')
		 	.then(res =>{
		 		commit('SET_TIMEZONES', res.data)
		 		console.log(res.data)
		 	})
        },
        loadCountries({commit}){
        	axios
		 	.get('http://api.casinoplatform.site/v3/countries?per-page=400')
		 	.then(res =>{
		 		commit('SET_COUNTRIES', res.data)
		 	})
        },
        changeAccount({commit}, payload){

        	let currency = {
        		is_current: true
        	}

        	// console.log(payload)

        	// return

        	axios
        	.patch( `http://api.casinoplatform.site/v3/accounts/${payload}` , currency)
        	.then(res =>{
        		console.log(res.data)
        	})
        }
	},
	getters: {
  		getGames(state){
  			return state.games
  		},
  		getRegFields(state){
  			return state.regFields
  		},
  		getCurrency(state){
  			return state.currency
  		},
  		getFaq(state){
  			return state.faq
  		},
  		getSlider(state){
  			return state.slider
  		},
  		getNews(state){
  			return state.news
  		},
  		getGroups(state){
  			return state.groups
  		},
  		getPlayer(state){
  			return state.player
  		},
  		getZones(state){
  			return state.timezones
  		},
  		getCountries(state){
  			return state.countries
  		},
  		getAuthenticated(state){
  			return state.authenticated
  		}
	}
}

export default auth


