<template>
  <section id="login">
    <div class="container">
      <div class="col-lg-6 col-lg-offset-3">
        <div class="form-box text-center">
          <h2>LOGIN</h2>
          <p class="white-txt">Sign in with your social network</p>
          <form>
            <input type="text" placeholder="E-mail" v-model="login">
            <input type="password" placeholder="Password" v-model="password">
            <div class="remember">
              <div class="remember-me"
                   :class="{checked: rememberUser}"
                   @click="rememberUser = !rememberUser">
                <div class="ch-box"></div>
                <span>Remember me</span>
              </div>
              <router-link tag="a" to="/recovery" class="under-link">Forgot password</router-link>
            </div>
            <button type="submit" @click.prevent="submitLog()" class="reg-btn">LOGIN</button>
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
      password: ''
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


      API.post('oauth2/token', userLog)
        .then(response => {
          let tokenEntity = {
            userToken: response.data.access_token,
            timestamp: new Date().getTime()
          }

          localStorage.setItem("userToken", JSON.stringify(tokenEntity));

          this.$store.dispatch('auth/getUser')
        }).then(() => {
          this.$router.replace("/profile");
        });


    }
  }
}
</script>
