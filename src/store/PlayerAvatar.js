import {API} from '../api'

const playerAvatar = {
	namespaced: true,
	actions: {
		upload({commit, dispatch}, formData) {
			return new Promise((resolve, reject) => {
				let config = {
					headers: {"Content-Type": "multipart/form-data"}
				}
				API.post('player-avatars', formData, config).then(response => {

					resolve(response)
				}).catch(error => {

					reject(error)
				})
			});
		}
	}
}

export default playerAvatar
