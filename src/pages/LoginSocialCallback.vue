<template>
  <section id="p-404" v-if="errorMessage">
    <div class="text-center">
      <h2>{{ $t('failed.failDescription') }}</h2><br>
      <router-link tag="button" to="/" class="reg-btn">
        {{ $t('main.goHomeLink') }}
      </router-link>
    </div>
  </section>
</template>
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
      errorMessage: false,
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
        .then(response => {

          let currentTimeInTimestamp = new Date().getTime() / 1000 | 0;

          let tokenEntity = {
            userToken: response.data.access_token,
            refreshToken: response.data.refresh_token,
            expiresIn: currentTimeInTimestamp,
            timestamp: new Date().getTime()
          }

          localStorage.setItem('userToken', JSON.stringify(tokenEntity))

          this.$store.dispatch('auth/getUser')

          this.$router.replace('/profile')
        })
        .catch(error => {
          this.errorMessage = true
        });
  }
}
</script>