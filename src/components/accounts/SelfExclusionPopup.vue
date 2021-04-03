<template>
  <div class="mes-pop settings-popup" @click="closePopup">
    <div class="mes-pop-box" @click.stop>
      <div class="cross" @click="closePopup">✕</div>
      <h2>{{ $t('selfExclusion.title') }}</h2>
      <div class="col-lg-12">
        <p class="popup-content white-txt">{{ $t('selfExclusion.description') }}</p>

      </div>

      <div class="row">
        <div class="col-lg-6">
          <label for="profile-birthday">{{ $t('selfExclusion.dateLabel') }}</label>
          <input id="profile-birthday" type="date" v-model="date" :class="{errorInp: passwordError}">
        </div>
      </div>

      <div class="row">
        <div class="col-lg-6">
          <label for="profile-password-old">{{ $t('selfExclusion.password') }}</label>
          <input id="profile-password-old" type="password" v-model="password" :class="{errorInp: passwordError}">
        </div>
      </div>


      <div class="col-lg-12">
        <br>
        <button class="reset-password-confirm-btn" @click="openConfirmPopup()">
          {{ $t('selfExclusion.button') }}
        </button>
      </div>
    </div>

    <confirm-popup v-if="isOpenedConfirmPopup"
                   :message="$t('selfExclusion.confirmationDescription')"
                   @closePopup="closeConfirmPopup"
                   @confirm="selfExclusion"/>

  </div>
</template>


<script>

import ConfirmPopup from "../ConfirmPopup";
export default {
  components: {ConfirmPopup},
  data() {
    return {
      date: null,
      password: null,
      passwordError: false,
      isOpenedConfirmPopup: false
    }
  },
  methods: {
    openConfirmPopup() {
      this.isOpenedConfirmPopup = true
    },
    closeConfirmPopup() {
      this.isOpenedConfirmPopup = false
    },
    closePopup() {
      this.$emit('closePopup')
    },
    selfExclusion() {
      let payload = {
        password: btoa(this.password),
        date: this.date
      }

      this.$store.dispatch('player/excludeAccount', payload).then(() => {
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

.reset-password-confirm-btn {
  color: #fff;
  border: none;
  padding: 16px 60px;
  font-size: 12px;
  background: #4D2ADC;
  transition: all .3s ease;
  height: 100%;
  letter-spacing: 0.17em;
  border-radius: 16px;
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