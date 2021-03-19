<template>
  <section id="login">
    <div class="container">
      <div class="col-lg-6 col-lg-offset-3">
        <div class="form-box text-center">
          <h2>LOGIN</h2>
          <p class="white-txt">{{ $t('login.socialSignInTitle') }}</p>
          <div class="social">
            <a :href="socialLoginFacebook()" class="social-login1">
              <img src="../assets/img/facebook.svg" alt="">
            </a>
            <a :href="socialLoginGoogle()" class="social-login2">
              <img src="../assets/img/google.svg" alt="">
            </a>
          </div>
          <form>
            <input type="text" :placeholder="$t('login.email')" v-model="login">
            <input type="password" :placeholder="$t('login.password')" v-model="password">
            <div class="remember">
              <div class="remember-me"
                   :class="{checked: rememberUser}"
                   @click="rememberUser = !rememberUser">
                <div class="ch-box"></div>
                <span>{{ $t('login.rememberMe') }}</span>
              </div>
              <router-link tag="a" to="/recovery" class="under-link">{{ $t('login.forgotPassword') }}</router-link>
            </div>
            <p style="color: red;" class="text-center" v-if="errors">{{ $t('login.error') }}</p>
            <div v-if="isLoading">
              <button type="submit" class="reg-btn"><img src="../assets/img/icons/nv6.svg" class="spin"></button>
            </div>
            <div v-else>
              <button type="submit" @click.prevent="submitLog()" class="reg-btn">{{ $t('login.loginUPPER') }}</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>


<script>

export default {
  data() {
    return {
      rememberUser: false,
      isLoading: false,
      login: '',
      password: '',
      errors: false
    }
  },
  methods: {
    submitLog() {
      this.isLoading = true
      let params = {
        username: this.login,
        password: btoa(this.password)
      }
      this.$store.dispatch('auth/loadPlayerTokenByUsernamePassword', params).then(() => {
        this.$store.dispatch('player/loadCurrent').then(() => {
          this.isLoading = false
          this.$router.replace("/profile");
        })
      }).catch(() => {
        this.errors = true
        this.isLoading = false
      })
    },
    socialLoginFacebook() {
      return this.socialLogin('facebook')
    },
    socialLoginGoogle() {
      return this.socialLogin('google')
    },
    socialLogin(socialName) {
      let apiUrl = process.env.SOCIAL_APP_URL
      let casinoUrl = process.env.CASINO_APP_URL
      let token = process.env.SOCIAL_APP_PUBLIC_TOKEN

      let backUrl = casinoUrl + '/enter/social';

      return apiUrl + '/social/login/' + socialName + '/' + token + '?back_url=' + backUrl
    }
  }
}
</script>


<style>
.social-login1 {
  padding: 15px 15px;
  background-color: #3B5998;
  border-radius: 5px;
  margin: 0 5px;
}

.social-login2 {
  padding: 15px 15px;
  background-color: #fff;
  border-radius: 5px;
  margin: 0 5px;
}

.social-login1 img {
  height: 30px;
}

.social-login2 img {
  height: 28px;
}

.social {
  margin: 20px 0;
}

</style>
