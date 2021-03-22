<template>
  <div class="mes-pop" @click="cancelBonusTransactionUnsubscription">
    <div class="mes-pop-box" @click.stop>
      <div class="cross" @click="cancelBonusTransactionUnsubscription">✕</div>
      <h2>{{ bonusTransaction.bonus.title }}</h2>
      <div class="bonus-transaction-unsubscription-content">
        <div class="bonus-transaction-unsubscription-img"
             :style="{'background-image': bonusTransaction.bonus.banners.length ? 'url(' + bonusTransaction.bonus.banners[0].url + ')' : ''}">
        </div>
        <div class="bonus-transaction-unsubscription-info">
          <accordions :data="descriptionSpoilerData"/>
        </div>
      </div>

      <div class="bonus-transaction-unsubscription-confirm-dialog">
        <h3>Are you sure, you want unsubscribe bonus?</h3>
        <div class="bonus-transaction-unsubscription-confirm-dialog-buttons">
          <button @click="unsubscribeBonusTransaction(bonusTransaction)" class="save-btn bonus-transaction-unsubscription-confirm">Confirm</button>
          <button @click="cancelBonusTransactionUnsubscription" class="save-btn bonus-transaction-unsubscription-cancel">Cancel</button>
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
  mounted() {
    document.addEventListener('keyup', this.cancelBonusTransactionUnsubscription);
  },
  methods: {
    cancelBonusTransactionUnsubscription() {
      this.$emit('cancelBonusTransactionUnsubscription')
    },
    unsubscribeBonusTransaction(transaction) {
      this.$store.dispatch('bonusTransactions/unsubscribe', transaction.id).then(() => {
        this.$router.push('/my-bonuses/all')
      })
    }
  }
}
</script>

<style>

.bonus-transaction-unsubscription-content {
  display: flex;
  margin-bottom: 30px;
}
.bonus-transaction-unsubscription-info {
  flex: 3;
  margin-left: 10px;
  max-height: 300px;
  overflow-y: hidden;
}

.bonus-transaction-unsubscription-img {
  flex: 1;
  height: 180px;
  border-radius: 30px;
  background-image: url(../../assets/img/bonus/default.png);
  background-position: center right;
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;
}

.bonus-transaction-unsubscription-confirm-dialog-buttons {
  margin-top: 30px;
}

.bonus-transaction-unsubscription-confirm-dialog-buttons button {
  margin-right: 10px;
}

</style>
