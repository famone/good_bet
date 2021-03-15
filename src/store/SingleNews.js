import {API} from '../api'
import News from "../dto/News";

const singleNews = {
	namespaced: true,
	state: {
		news: null
	},
	mutations: {
		RESET(state) {
			state.news = null
		},
		SET_NEWS(state, payload) {
			state.news = new News(payload)
		}
	},
	actions: {
		reset({commit}) {
			commit('RESET')
		},
		loadById({commit}, id) {
			return new Promise((resolve, reject) => {
				API.get('news/' + id).then(response => {
					commit('SET_NEWS', response.data)

					resolve(response)
				}).catch(error => {
					reject(error)
				})
			})
		}
	},
	getters: {
		getNews(state) {
			return state.news
		}
	}
}

export default singleNews
