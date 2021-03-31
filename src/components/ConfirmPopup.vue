<template>
  <div class="mes-pop settings-popup" @click="closePopup">
    <div class="mes-pop-box" @click.stop>
      <div class="cross" @click="closePopup">✕</div>
      <h2>{{ $t('confirmPopup.title') }}</h2>

      <div class="col-lg-12" v-if="message">
        <p class="popup-content white-txt">{{ message }}</p>
        <br>
      </div>

      <div class="col-lg-6">
        <button class="confirm-btn" @click="confirm()">
          {{ $t('confirmPopup.confirm') }}
        </button>
      </div>

      <div class="col-lg-6">
        <button class="cancel-btn" @click="closePopup()">
          {{ $t('confirmPopup.cancel') }}
        </button>
      </div>
    </div>


  </div>
</template>


<script>

export default {
  props: {
    message: {
      required: false,
      type: String,
      default: null
    }
  },
  methods: {
    closePopup() {
      this.$emit('closePopup')
    },
    confirm() {
      this.$emit('confirm')
    },
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

.confirm-btn {
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

.cancel-btn {
  color: #fff;
  border: none;
  padding: 16px 60px;
  font-size: 12px;
  background: #f85149;
  transition: all .3s ease;
  height: 100%;
  letter-spacing: 0.17em;
  border-radius: 16px;
}

</style>