<template>
  <div class="mes-pop" @click="closeBonusPopup">
    <div class="mes-pop-box" @click.stop>
      <div class="cross" @click="closeBonusPopup">✕</div>
      <h2>{{ bonus.title }}</h2>
      <br>
      <p class="white-txt" v-html="bonus.description"></p>
      <hr>
      <h4 v-if="bonus.wagering_rules">Amount: x {{ bonus.wagering_rules[0].amount_as_currency }}</h4>
      <br>
      <h4 v-if="bonus.wagering_rules">Wager type: {{ bonus.wagering_rules[0].wagering_type }}</h4>
      <br>
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
    closeBonusPopup() {
      this.$emit('closeShowMore')
    }
  }
}
</script>

