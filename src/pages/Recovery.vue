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
            <button type="submit" @click.prevent="resetPass()" class="reg-btn">{{ $t('recovery.loginUPPER') }}</button>
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
            login: ''
          }
        },
        methods: {
            resetPass(){

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
                  console.log(response)
              })
              .catch(error =>{
                this.errors = true
              })
            }
        }
    }
</script> 