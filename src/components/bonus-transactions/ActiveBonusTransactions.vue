<template>
  <div>
    <div class="row-bonuses" v-if="bonusTransactions">
      <Skeletons v-if="loading" v-bind:element-per-count="3" element-wrapper-class="col-lg-4 col-sm-6"/>
      <div v-else-if="bonusTransactions.length" v-for="bonusTransaction in bonusTransactions" class="col-lg-4 col-sm-6">
        <div class="bonus-transaction-card">

          <div v-if="bonusTransaction.bonus.banners.length"
               class="bonus-transaction-img"
               :style="{'background-image': 'url(' + bonusTransaction.bonus.banners[0].url + ')'}">
          </div>
          <div v-else class="bonus-transaction-img"></div>

          <div class="bonus-transaction-body">
            <p class="bonus-transaction-title">{{ bonusTransaction.bonus.title }}</p>

            <div class="bonus-transaction-action-buttons">
              <button class="show-more-transaction-btn bonus-transaction-action-button"
                      @click="showMore(bonusTransaction)">{{ $t('myBonusTransactions.more') }}
              </button>

              <button class="cancel-transaction-btn bonus-transaction-action-button"
                      @click="cancelActiveTransaction(bonusTransaction)">
                <img src="../../assets/img/minus.svg" alt="">
              </button>
            </div>
          </div>

        </div>
      </div>
      <div v-else>
        <h4>There is no bonuses yet</h4>
      </div>
    </div>

    <cancel-popup v-if="isBonusCancellationConfirmationPopup"
                  :bonusTransaction="transactionForCancellation"
                  @cancelBonusTransactionCancellation="closeConfirmationPopup"/>

    <active-bonus-transaction-popup v-if="isShowMorePopup"
                                    :transaction="transactionInShowMore"
                                    @closeBonusTransactionShowMore="closeBonusTransactionShowMore"/>
  </div>


</template>


<script>

import ActiveBonusTransactionPopup from "../bonus/ActiveBonusTransactionPopup";
import CancelPopup from "../bonus/CancelPopup";
import {mapGetters} from "vuex";
import Skeletons from "../Skeletons";

export default {
  components: {Skeletons, CancelPopup, ActiveBonusTransactionPopup},
  computed: {
    ...mapGetters({
      bonusTransactions: 'bonusTransactions/getActiveBonusTransactions',
      player: 'player/getCurrent'
    }),
  },
  watch: {
    player() {
      this.$store.dispatch('bonusTransactions/loadActive').then(() => {
        this.loading = false
      })
    },
  },
  data() {
    return {
      loading: true,
      isBonusCancellationConfirmationPopup: false,
      isShowMorePopup: false,
      transactionInShowMore: null,
      transactionForCancellation: null
    }
  },
  created() {
    this.$store.dispatch('bonusTransactions/loadActive').then(() => {
      this.loading = false
    })
  },
  methods: {
    showMore(transaction) {
      this.transactionInShowMore = transaction
      this.isShowMorePopup = true
    },
    closeBonusTransactionShowMore() {
      this.transactionInShowMore = null
      this.isShowMorePopup = false
    },
    cancelActiveTransaction(transaction) {
      this.transactionForCancellation = transaction
      this.isBonusCancellationConfirmationPopup = true
    },
    closeConfirmationPopup() {
      this.transactionInShowMore = null
      this.isBonusCancellationConfirmationPopup = false
    }
  }
}

</script>

<style>

.bonus-transaction-card {
  border-radius: 30px;
  margin-bottom: 30px;
  overflow: hidden;
}

.bonus-transaction-title {
  color: #fff;
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 30px;
  margin-top: 0;
  text-transform: uppercase;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  height: 20px;
}

.bonus-transaction-action-buttons {

}

.bonus-transaction-img {
  height: 180px;
  width: 100%;
  background-image: url(../../assets/img/bonus/default.png);
  background-position: center right;
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;
}

.bonus-transaction-body {
  background: #1D1B49;
  padding: 30px;
  transition: all .4s ease;
  max-height: 190px;
}

.bonus-transaction-card:hover {
  box-shadow: 0 2px 16px 2px rgb(206 54 201 / 10%)
}

.bonus-transaction-action-buttons {
  display: block;
}

.cancel-transaction-btn,
.show-more-transaction-btn {
  border: none;
  height: 49px;
  width: 49px;
  font-size: 12px;
  background: #4D2ADC;
  color: #fff;
  transition: all .3s ease;
  letter-spacing: 0.17em;
  border-radius: 16px;
}

.cancel-transaction-btn {
  margin-left: 10px;
}

.show-more-transaction-btn {
  padding-top: 16px;
  padding-bottom: 16px;
  width: 120px;
}

.cancel-transaction-btn:hover,
.show-more-transaction-btn:hover {
  box-shadow: 0px 2px 16px 2px rgb(206 54 201 / 22%);
}

.cancel-transaction-btn img {
  height: 20px;
}
</style>

