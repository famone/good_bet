const axios = require('axios')
import store from './store/index'

export const API = axios.create({
  baseURL: process.env.CASINO_APP_API_URL
})

API.interceptors.response.use(null, function (error) {
  if (error.response.status === 401) {
    console.log('Failed to login')

    // store.dispatch('auth/getAppToken')

    return axios(error.response.config);
  }
  return Promise.reject(error)
})