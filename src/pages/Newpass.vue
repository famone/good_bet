<template>
  <section id="login">
    <div class="container">
      <div class="col-lg-6 col-lg-offset-3">
        <div class="form-box text-center">
          <h2>{{ $t('newPass.title') }}</h2>
          <form>
            <input type="text" :placeholder="$t('newPass.passOne')" v-model="pass1">
            <input type="text" :placeholder="$t('newPass.passTwo')" v-model="pass2">
           
            <p style="color: red;" class="text-center" v-if="errors">Passwords are incorrect</p>
            <button type="submit"  class="reg-btn">{{ $t('newPass.loginUPPER') }}</button>
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
            pass1: '',
            pass2: ''
          }
        }
    }
</script> 