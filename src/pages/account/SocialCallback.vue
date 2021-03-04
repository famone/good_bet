<template>
  <section id="p-404" v-if="errorBind">
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

import { API } from '../../api'
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters({ player: 'auth/getPlayer' }),
  },
  data () {
    return {
      errorBind: false,
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
      service_name: 'socialmedia',
      service_data: encodedStr,
    }

    API.post('networks', parameters)
        .then(response => {
          this.$route.push('account_socials')
        })
        .catch(error => {
          this.errorBind = true
        })
  }
}
</script>