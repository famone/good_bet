<template>
</template>
<section id="p-404" v-if="loading">
<div class="text-center" v-if="login">
  <img src="../assets/img/success.svg" class="succesfully"><br>
  <h2>Ok</h2><br>
</div>
<div class="text-center" v-if="!login">
  <h2>=(</h2><br>
</div>
</section>
<style>
</style>

<script>

import { API } from '../api'
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters({ player: 'auth/getPlayer' }),
  },
  data () {
    return {
      login: false,
      loading: false,
    }
  },
  methods: {
    socialLogin (socialName) {

      let apiUrl = process.env.SOCIAL_APP_URL
      let casinoUrl = process.env.CASINO_APP_URL
      let token = process.env.SOCIAL_APP_PUBLIC_TOKEN

      let backUrl = casinoUrl + '/social/callback'

      return apiUrl + '/social/login/' + socialName + '/' + token + '?back_url=' + backUrl
    }
  },
  created () {
    let tokenAccess = this.$route.query.token_access

    let str = {
      token: tokenAccess
    }

    let jsonArrData = JSON.stringify(str)

    const encodedStr = btoa(jsonArrData)

    console.log(str)
    console.log(encodedStr)
    console.log(this.player)

    if (!this.player) {

      let parameters = {
        service_name: 'socialmedia',
        service_data: encodedStr,
      }

      API.post('networks', parameters)
          .then(function (response) {
            this.login = true
            this.loading = true
            console.log(response)

            this.$route.push('account_socials')
          })

    } else {

      let parameters = {
        grant_type: 'social',
        service_name: 'socialmedia',
        service_data: encodedStr,
      }

      let config = {
        headers: {
          Authorization: 'Basic ' + process.env.CASINO_APP_API_AUTH_TOKEN,
        }
      }
      API.post('oauth2/token', parameters, config)
          .then(function (response) {
            this.login = true
            this.loading = true
            console.log(response)
          })
      console.log(parameters)
    }
  }
}
</script>