const axios = require('axios')

const API = axios.create({
  baseURL: process.env.CASINO_APP_API_URL,
})

let isAlreadyFetchingAccessToken = false
let subscribers = []

function onAccessTokenFetched(access_token) {
  subscribers = subscribers.filter(callback => callback(access_token))
}

function addSubscriber(callback) {
  subscribers.push(callback)
}

API.interceptors.response.use(null, function (error) {

  const { config, response } = error
  const originalRequest = config

  if (error.response.status === 401) {
    if (!isAlreadyFetchingAccessToken) {

      isAlreadyFetchingAccessToken = true

      //todo refactor me
      localStorage.removeItem("player");
      localStorage.removeItem("player");
      localStorage.removeItem("appToken");

      let config = {
        headers: {
          Authorization: 'Basic ' + process.env.CASINO_APP_API_AUTH_TOKEN,
        }
      }

      API.post('oauth2/token', {
        grant_type: "client_credentials",
        scope:"guest:default"
      }, config)
        .then(response => {
          let token = response.data.access_token
          console.log(token)
          isAlreadyFetchingAccessToken = false
          onAccessTokenFetched(token)
        })

    }

    return new Promise((resolve) => {
      addSubscriber(access_token => {

        originalRequest.headers.Authorization = 'Bearer ' + access_token
        resolve(axios(originalRequest))
      })
    })
  }
  return Promise.reject(error)
})

export { API }