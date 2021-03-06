import {API} from '../api'

const feedback = {
	namespaced: true,
	actions: {
		sendFeedback({dispatch}, params) {
			return API.post('feedback', params)
		}
	}
}

export default feedback
