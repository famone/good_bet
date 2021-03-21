<template>
  <div class="mes-pop" @click="closeBonusTransactionShowMore">
    <div class="mes-pop-box" @click.stop>
      <div class="cross" @click="closeBonusTransactionShowMore">✕</div>
      <h2>{{ transaction.bonus.title }}</h2>
      <br>
      <p class="white-txt" v-html="transaction.bonus.description"></p>
      <hr>
      <h4>Amount: x {{ transaction.bonus.wagering_rules[0].amount_as_currency }}</h4>
      <br>
      <h4>Wager type: {{ transaction.bonus.wagering_rules[0].wagering_type }}</h4>
    </div>
  </div>
</template>


<script>
export default {
  props: {
    transaction: {
      required: true,
      type: Object
    }
  },
  methods: {
    closeBonusTransactionShowMore() {
      this.$emit('closeBonusTransactionShowMore')
    }
  }
}
</script>
