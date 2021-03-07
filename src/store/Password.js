import {API} from '../api'

const password = {
	namespaced: true,
	actions: {
		reset({commit}, login) {
			let resetConfig = {
				login: login,
				callbacks: [
					{
						type: "reset",
						//TODO fix this
						redirect_uri: "https://casino.com/new-password"
					}
				]
			}


			return new Promise((resolve, reject) => {
				API.post('passwords', resetConfig).then(response => {
					resolve(response)
				}).catch(error => {
					reject(error)
				})
			})
		}
	}
}

export default password