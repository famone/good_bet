const axios = require('axios')
import store from './store/index'

export const API = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
  headers: {
    Authorization: 'Basic ' + process.env.VUE_APP_API_AUTH_TOKEN,
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