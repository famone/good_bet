<template>
  <div class="mes-pop" @click="cancelBonusTransactionCancellation">
    <div class="mes-pop-box" @click.stop>
      <div class="cross" @click="cancelBonusTransactionCancellation">✕</div>
      <h2>{{ bonusTransaction.bonus.title }}</h2>
      <div class="bonus-transaction-cancellation-content">
        <div class="bonus-transaction-cancellation-img"
             :style="{'background-image': bonusTransaction.bonus.banners.length ? 'url(' + bonusTransaction.bonus.banners[0].url + ')' : ''}">
        </div>
        <div class="bonus-transaction-cancellation-info">
          <accordions :data="descriptionSpoilerData"/>
        </div>
      </div>

      <div class="bonus-transaction-cancellation-confirm-dialog">
        <h3>Are you sure, you want cancel bonus?</h3>
        <div class="bonus-transaction-cancellation-confirm-dialog-buttons">
          <button @click="cancelBonusTransaction(bonusTransaction)" class="save-btn bonus-transaction-cancellation-confirm">Confirm</button>
          <button @click="cancelBonusTransactionCancellation" class="save-btn bonus-transaction-cancellation-cancel">Cancel</button>
        </div>

      </div>
    </div>
  </div>
</template>


<script>

import Accordions from "../ui/accordions";
export default {
  components: {Accordions},
  props: {
    bonusTransaction: {
      required: true,
      type: Object
    }
  },
  data() {
    return {
      descriptionSpoilerData: [{
        name: 'Details',
        desc: this.bonusTransaction.bonus.description,
        active: false
      }]
    }
  },
  methods: {
    cancelBonusTransactionCancellation() {
      this.$emit('cancelBonusTransactionCancellation')
    },
    cancelBonusTransaction(transaction) {
      this.$store.dispatch('bonusTransactions/cancel', transaction.id).then(() => {
        this.$router.push('/my-bonuses')
      })
    }
  }
}
</script>

<style>

.bonus-transaction-cancellation-content {
  display: flex;
  margin-bottom: 30px;
}
.bonus-transaction-cancellation-info {
  flex: 3;
  margin-left: 10px;
  max-height: 300px;
  overflow-y: hidden;
}

.bonus-transaction-cancellation-img {
  flex: 1;
  height: 180px;
  border-radius: 30px;
  background-image: url(../../assets/img/bonus/default.png);
  background-position: center right;
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;
}

.bonus-transaction-cancellation-confirm-dialog-buttons {
  margin-top: 30px;
}

.bonus-transaction-cancellation-confirm-dialog-buttons button {
  margin-right: 10px;
}

</style>
