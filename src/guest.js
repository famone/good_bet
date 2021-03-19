import axios from "axios";
import {CasinoLocalStorage} from "./CasinoLocalStorage";

class Guest
{
	static getGuestToken() {
		let params = {
			grant_type: "client_credentials",
			scope: "guest:default"
		};

		return new Promise((resolve, reject) => {
			let config = {
				baseURL: process.env.CASINO_APP_API_URL,
				headers: {
					Authorization: 'Basic ' + process.env.CASINO_APP_API_AUTH_TOKEN,
				}
			}

			axios.post('oauth2/token', params, config).then(response => {
				let guest = {
					token: {
						accessToken: response.data.access_token,
						timestamp: new Date().getTime()
					}
				}

				CasinoLocalStorage.saveGuest(guest)

				resolve(response)
			}).catch(error => {
				console.log(error.response.status)
			});
		});
	}
}

export {Guest}