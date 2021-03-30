<template>
  <section class="recovery-deleted-wrapper">
    <div class="container">
      <div class="col-lg-6 col-lg-offset-3">
        <div class="form-box text-center">
          <h2>{{ $t('recoveryDeleted.title') }}</h2>
          <p class="white-txt">{{ $t('recovery.recoveryPasswordDeletedTitle') }}</p>
          <form>
            <input type="text" :placeholder="$t('recovery.password')" v-model="password">

            <p style="color: red;" class="text-center" v-if="errors">{{ $t('login.error') }}</p>

            <button v-if="!isLoading" type="submit" @click.prevent="recoveryDeletedAccount()" class="reg-btn">
              {{ $t('recoveryDeleted.submitButtonTitle') }}
            </button>
            <button v-else type="submit" class="reg-btn"><img src="../assets/img/icons/nv6.svg" class="spin"></button>
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
      errors: false,
      isLoading: false,
      success: false,
      password: null,
      token: null
    }
  },
  methods: {
    recoveryDeletedAccount() {
      this.isLoading = true

      let restoreParam = {
        token: this.$route.params.secretToken,
        password: btoa(this.password)
      }

      this.$store.dispatch('player/restoreAccount', restoreParam).then(() => {
        this.isLoading = false
      }).catch(() => {
        this.isLoading = false
      })
    }
  }
}
</script>

<style>


.recovery-deleted-wrapper{
  padding: 130px 0;
  min-height: calc(90vh);
}
</style>