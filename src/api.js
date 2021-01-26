const axios = require('axios')
import store from './store/index'

export const API = axios.create({
  baseURL: `http://api.casinoplatform.site/v3`, //@todo env
  headers: {
    Authorization: 'Basic ZnJvbnRfYmVhcmVyOg==', //Env
  }
})

API.interceptors.response.use(null, function (error) {
  if (error.response.status === 401) {
    console.log('Failed to login')

    // store.dispatch('auth/getAppToken')

    return axios(error.response.config);
  }
  return Promise.reject(error)
})