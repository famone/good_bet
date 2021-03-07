import { API } from '../api'

const message = {
	namespaced: true,
	actions: {
		setUnreadByMessageId({commit, dispatch}, id) {
			return new Promise((resolve, reject) => {
				API.patch( `messages/${id}`, {
					delivery_status: "read"
				}).then(response => {
					dispatch('messages/loadMessages', null, {root: true})

					resolve(response)
				}).catch(error => {
					reject(error)
				})
			})
		},
	}
}

export default message