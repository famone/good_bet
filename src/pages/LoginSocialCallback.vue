<template>
  <section id="p-404" v-if="errorMessage">
    <div class="text-center">
      <h2>{{ $t('login.social_login_error_message') }}</h2><br>
      <router-link tag="button" to="/" class="reg-btn">
        {{ $t('main.goHomeLink') }}
      </router-link>
    </div>
  </section>
</template>
<style>
</style>

<script>

import {API} from '../api'
import {mapGetters} from 'vuex'

export default {
  computed: {
    ...mapGetters({player: 'player/getCurrent'}),
  },
  data() {
    return {
      errorMessage: false,
    }
  },
  methods: {
    socialLogin(socialName) {

      let apiUrl = process.env.SOCIAL_APP_URL
      let casinoUrl = process.env.CASINO_APP_URL
      let token = process.env.SOCIAL_APP_PUBLIC_TOKEN

      let backUrl = casinoUrl + '/social/callback'

      return apiUrl + '/social/login/' + socialName + '/' + token + '?back_url=' + backUrl
    }
  },
  created() {
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

    this.$store.dispatch('auth/loadPlayerToken', parameters).then(() => {
      this.$store.dispatch('player/loadCurrent')
      this.$router.replace('/profile')
    }).catch(() => {
      this.errorMessage = true
    });
  }
}
</script>