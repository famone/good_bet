<template>
  <section id="login">
    <div class="container">
      <div class="col-lg-6 col-lg-offset-3">
        <div class="form-box text-center">
          <h2>{{ $t('recovery.title') }}</h2>
          <p class="white-txt">{{ $t('recovery.socialSignInTitle') }}</p>
          <form>
            <input type="text" :placeholder="$t('recovery.email')" v-model="login">
           
            <p style="color: red;" class="text-center" v-if="errors">{{ $t('login.error') }}</p>



            <div v-if="isLoading">
              <button type="submit" class="reg-btn"><img src="../assets/img/icons/nv6.svg" class="spin"></button>
            </div>
            <div v-else>
              <button type="submit" @click.prevent="resetPass()" class="reg-btn">{{ $t('recovery.loginUPPER') }}</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script> 
import {API} from "../api";

    export default{
        data(){
          return{
            errors: false,
            isLoading: false,
            login: ''
          }
        },
        methods: {
            resetPass(){
              this.isLoading = true

                let resetConfig = {
                    login: this.login ,
                    callbacks: [
                      {
                        type: "reset",
                        redirect_uri: "https://casino.com/new-password"
                      }
                    ]
                }


              API.post('passwords', resetConfig)
              .then(response => {
                this.isLoading = false
              })
              .catch(error =>{
                this.isLoading = false
              })
            }
        }
    }
</script> 