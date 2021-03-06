import {API} from '../api'
import News from "../dto/News";

const singleNews = {
	namespaced: true,
	state: {
		news: null
	},
	mutations: {
		SET_NEWS(state, payload) {
			state.news = new News(payload)
		}
	},
	actions: {
		loadById({commit}, id) {
			API.get('news/' + id).then(response => {
				commit('SET_NEWS', response.data)
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
