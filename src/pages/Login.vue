<template>
  <section id="login">
    <div class="container">
      <div class="col-lg-6 col-lg-offset-3">
        <div class="form-box text-center">
          <h2>LOGIN</h2>
          <p class="white-txt">{{ $t('login.socialSignInTitle') }}</p>
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
            <p style="color: red;" class="text-center" v-if="errors">Login details are incorrect</p>
            <button type="submit" @click.prevent="submitLog()" class="reg-btn">{{ $t('login.loginUPPER') }}</button>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>


<script>

import {API} from "../api";

export default {
  data() {
    return {
      rememberUser: false,
      login: '',
      password: '',
      errors: false
    }
  },
  methods: {
    submitLog() {

      let userLog = {
        grant_type: "password",
        username: this.login,
        password: btoa(this.password),
        scope: "casino:read bonus:read bonus.settings:read bonus:write lab:read lab:write game:read game:write game.history:read game.wallet:write game.launch:write player:read player:write message:read message:write payment:read payment:write player:write:all message:write winner:read faq:read news:read slider:read payment.callbacks:write"
      }


      let config = {
        headers: {
          Authorization: 'Basic ' + process.env.CASINO_APP_API_AUTH_TOKEN,
        }
      }

      API.post('oauth2/token', userLog, config)
          .then(response => {
            let tokenEntity = {
              userToken: response.data.access_token,
              timestamp: new Date().getTime()
            }

            localStorage.setItem("userToken", JSON.stringify(tokenEntity));

            this.$store.dispatch('auth/getUser')
          })
          .catch(error =>{
            this.errors = true
          })
          .then(() => {
        this.$router.replace("/profile");
        });


    }
  }
}
</script>
