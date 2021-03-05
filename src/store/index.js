import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import auth from '../store/auth'
import news from '../store/news'
import games from '../store/games'
import faq from '../store/faq'
import currency from '../store/currency'
import slider from '../store/slider'
import lang from '../store/lang'
import countries from '../store/countries'
import timezones from '../store/timezones'
import gameGroups from '../store/gameGroups'
import account from '../store/account'
import messages from '../store/messages'

export default new Vuex.Store({
	modules: {
		auth,
		news,
		games,
		faq,
		currency,
		slider,
		lang,
		countries,
		timezones,
		gameGroups,
		account,
		messages
	}
}) 