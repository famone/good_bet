<template>
  <div class="mes-pop" @click="cancelBonusSubscription">
    <div class="mes-pop-box" @click.stop>
      <div class="cross" @click="cancelBonusSubscription">✕</div>
      <h2>{{ bonus.title }}</h2>
      <br>
      <p class="white-txt" v-html="bonus.description"></p>
      <hr>
      <button @click="subscribeToBonus(bonus)" class="save-btn">Confirm</button>
      <button @click="cancelBonusSubscription" class="save-btn">Cancel</button>
    </div>
  </div>
</template>


<script>

export default {
  props: {
    bonus: {
      required: true,
      type: Object
    }
  },
  methods: {
    cancelBonusSubscription() {
      this.$emit('cancelBonusSubscription')
    },
    subscribeToBonus(bonus) {
      this.$store.dispatch('bonusTransactions/subscribe', bonus.id).then(() => {
        this.$router.push('/my-bonuses')
      })
    }
  }
}
</script>
