import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import auth from './Auth'
import news from './News'
import singleNews from './SingleNews'
import games from './Games'
import faq from './Faq'
import currency from './Currency'
import slider from './Slider'
import lang from './Lang'
import countries from './Countries'
import timezones from './Timezones'
import gameGroups from './GameGroups'
import account from './Account'
import messages from './Messages'
import player from './Player'
import registerForm from './RegisterForm'
import bonuses from './Bonuses'
import transactions from './Transactions'
import loader from './Loader'
import paymentMethod from './PaymentMethods'
import feedback from './Feedback'
import message from './Message'
import playerUploadTypes from "./PlayerUploadTypes";
import playerUpload from "./PlayerUpload";
import game from "./Game";
import gameLauncher from "./GameLauncher";
import counter from "./Counter";
import password from "./Password";
import socialNetworks from "./SocialNetworks";
import playerAvatar from "./PlayerAvatar";

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
		messages,
		player,
		registerForm,
		bonuses,
		transactions,
		loader,
		paymentMethod,
		singleNews,
		feedback,
		message,
		playerUploadTypes,
		playerUpload,
		game,
		gameLauncher,
		counter,
		password,
		socialNetworks,
		playerAvatar
	}
}) 