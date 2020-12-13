
import axios from 'axios'

const auth = {
	namespaced: true,
	state: {
		credintals: {
			grant_type: "client_credentials",
		    scope:"guest:default"
		},
		games: []
  	},
	mutations: {
		SET_GAMES(state, payload){
			state.games = payload
		}
	},
	actions: {
         getToken({commit, state}){

         	

         	let config = {
			        headers: {
			          Authorization: 'Basic ZnJvbnRfYmVhcmVyOg==',
			        } 
			      }
			axios
	  		.post('http://api.casinoplatform.site/v3/oauth2/token', state.credintals, config)
	  		.then(response =>{

	        let token = response.data.access_token

	        config = {
	          headers: {
	            Authorization: 'Bearer ' + token,
	          }
	        }

	        axios
	        .get('http://api.casinoplatform.site/v3/games?expand=details,launch_types,images,type,provider,canonical', config)
	        .then(res =>{
	          console.log(res)
	          // this.games = res.data
	          commit('SET_GAMES', res.data)
	        })

	  		})
            
        },
	},
	getters: {
  		getGames(state){
  			return state.games
  		}
	}
}

export default auth


