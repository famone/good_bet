import { API } from '../api'

const message = {
	namespaced: true,
	actions: {
		setUnreadByMessageId({commit, dispatch}, id) {
			API.patch( `messages/${id}`, {
				delivery_status: "read"
			}).then(() => {
				dispatch('messages/loadMessages', null, {root: true})
			})
		},
	}
}

export default message