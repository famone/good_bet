
import axios from 'axios'

const auth = {
	namespaced: true,
	state: {
		credintals: {
			grant_type: "client_credentials",
		    scope:"guest:default"
		},
		games: [],
		regFields: [],
		currency: [],
		faq: '',
		slider: [],
		news: []
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
		}
	},
	actions: {
		getAppToken({commit, state}){
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

	  		})



		},
         getInfo({commit, state}){

         	axios
	        .get('http://api.casinoplatform.site/v3/sliders')
	        .then(res =>{
	          commit('SET_SLIDER', res.data)
	        })

         	

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
				// console.log(res.data)
				commit('SET_REG_FIELDS', res.data)
			})

			axios
			.get('http://api.casinoplatform.site/v3/games?type_id=1')
			.then(res => {
				console.log(res.data)
			})


			

// 			axios
// 			.get('http://api.casinoplatform.site/v3/payment-currencies')
// 			.then(res => {
// 				// console.log(res.data)
// 				commit('SET_CURRENCY', res.data)
// 			})

// // 
			
			// const gameRoom = {
			// 	game_id: 3674,
   //  			launch_type: "demo" ,
   //  			lobby_data: "",
			//     callbacks: [
			//         {
			//             type: "",
			//             redirect_uri: ""
			//         }
			//     ]
			// }

			// 	axios
			// 	.post('http://api.casinoplatform.site/v3/game-launches', gameRoom, config)
			// 	.then(res => {
			// 		console.log(res.data)
					
			// 	})
			
            
        },
        loadNews({commit}){
        	axios
			.get('http://api.casinoplatform.site/v3/news')
			.then(response =>{
				console.log(response)
				commit('SET_NEWS', response.data)
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
  		}
	}
}

export default auth


