<template>
  <div class="mes-pop settings-popup" @click="closePopup">
    <div class="mes-pop-box" @click.stop>
      <div class="cross" v-if="closable" @click="closePopup">✕</div>
      <h2>{{ $t('profileVerify.title') }}</h2>
      <div class="col-lg-12">
        <p class="popup-content white-txt">{{ $t('profileVerify.description') }}</p>
      </div>

      <div class="col-lg-12">
        <label for="profile-verify-code">{{ $t('profileVerify.verifyCode') }}</label>
        <input id="profile-verify-code" type="text" v-model="verifyCode" :class="{errorInp: verifyError}">
      </div>
      <div class="col-lg-12">
        <br>
        <button class="profile-verify-btn" @click="verifyProfile()">
          {{ $t('profileVerify.button') }}
        </button>
      </div>
    </div>


  </div>
</template>


<script>

export default {
  data() {
    return {
      verifyCode: null,
      verifyError: false,
    }
  },
  props: {
    playerId: {
      required: true,
      type: Number
    },
    closable: {
      required: false,
      type: Boolean,
      default: true
    }
  },
  methods: {
    closePopup() {
      this.$emit('closePopup')
    },
    verifyProfile() {
      this.$store.dispatch('player/verifyByEmail', this.verifyCode).then(() => {
        this.$emit('closePopup')
      }).catch(() => {
        this.verifyError = true
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

.profile-verify-btn {
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

.profile-verify-popup input {
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