<template>
  <div class="mes-pop settings-popup" @click="closePopup">
    <div class="mes-pop-box" @click.stop>
      <div class="cross" @click="closePopup">✕</div>
      <h2>{{ $t('deleteAccount.title') }}</h2>
      <div class="col-lg-12">
        <p class="popup-content white-txt">{{ $t('deleteAccount.description') }}</p>

      </div>
      <div class="col-lg-12">
        <p class="popup-content white-txt">{{ $t('deleteAccount.passwordField') }}</p>
      </div>

      <div class="col-lg-12">
        <input id="profile-password" type="password" v-model="password" :class="{errorInp: passwordError}">
      </div>
      <div class="col-lg-12">
        <br>
        <button class="delete-account-btn" @click="deleteAccount()">
          {{ $t('deleteAccount.button') }}
        </button>
      </div>
    </div>


  </div>
</template>


<script>

export default {
  data () {
    return {
      password: null,
      passwordError: false,
    }
  },
  methods: {
    closePopup () {
      this.$emit('closePopup')
    },
    deleteAccount () {
      let payload = {
        password: btoa(this.password)
      }

      this.$store.dispatch('player/deleteAccount', payload).then(() => {
        this.$store.dispatch('auth/logOut').then(() => {
          this.$router.replace("/");
        });
      }).catch(() => {
        this.passwordError = true
      })
    }
  }
}
</script>

<style>
.errorInp {
  border: 1px red solid !important;
}

.popup-content {
  margin-top: 5%;
}

.settings-popup input {
  padding: 19px 30px;
  border-radius: 15px;
  border: none;
  background: #272459 !important;
  color: #fff;
  width: 100%;
  margin-bottom: 28px;
  font-size: 16px;
  transition: all .3s ease;
  max-height: 60px;
}
</style>