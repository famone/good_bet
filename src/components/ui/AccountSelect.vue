<template>
  <div class="account-select-wrapper">
    <div class="account-select" :class="{open: opened}" @click="toggleSelectBox">
      <div class="account-select__trigger">
        <span class="account-option-selected">
          <div class="account-option-amounts">
            <div class="account-option-real-amount">
              <div class="account-option-real-amount-icon">
                <img src="../../assets/img/coins.svg" alt="">
              </div>
              <div class="account-option-real-amount-sum">
                {{ getCurrent().getFormattedAmount() }}
              </div>
            </div>
            <div class="account-option-bonus-amount">
              <div class="account-option-bonus-amount-icon">
                <img src="../../assets/img/icons/pr5.svg" alt="">
              </div>
              <div class="account-option-bonus-amount-sum">
                {{ getCurrent().getFormattedBonusAmount() }}
              </div>
            </div>
          </div>
          <div class="account-option-currency">
             {{ getCurrent().currency_code }}
          </div>
        </span>
        <div class="arrow">
          <img class="arrow-img" src="../../assets/img/downarr.svg" alt="">
        </div>
      </div>
      <div class="account-options">
        <span class="account-option"
              v-for="account in accounts"
              :data-value="account.id"
              v-if="!account.is_current"
              @click="onAccountSelect(account.id)">
          <div class="account-option-amounts">
            <div class="account-option-real-amount">
              <div class="account-option-real-amount-icon">
                <img src="../../assets/img/coins.svg" alt="">
              </div>
              <div class="account-option-real-amount-sum">
                {{ account.getFormattedAmount() }}
              </div>
            </div>
            <div class="account-option-bonus-amount">
              <div class="account-option-bonus-amount-icon">
                <img src="../../assets/img/icons/pr5.svg" alt="">
              </div>
              <div class="account-option-bonus-amount-sum">
                {{ account.getFormattedBonusAmount() }}
              </div>
            </div>
          </div>
          <div class="account-option-currency">
             {{ account.currency_code }}
          </div>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    accounts: {
      type: Array,
      required: true
    },
  },
  data() {
    return {
      opened: false
    }
  },
  methods: {
    toggleSelectBox() {
      this.opened = !this.opened
    },
    getCurrent() {
      return this.accounts.find(item => {
        return item.is_current === true
      })
    },
    onAccountSelect(accountId) {
      this.$emit('onAccountSelect', accountId)
    }
  }
}

</script>

<style>
.account-select-wrapper {
  position: relative;
  user-select: none;
  width: 100%;
}

.account-select {
  position: relative;
  display: flex;
  flex-direction: column;
}

.account-select__trigger {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-weight: 300;
  cursor: pointer;
  background-color: #272459;
  margin-bottom: 7px;
}

.account-options {
  position: absolute;
  background-color: #272459;
  top: 100%;
  left: 0;
  right: 0;
  border-top: 0;
  transition: all 0.5s;
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
  z-index: 2;
  display: block;
  border-radius: 3px;
}

.account-select.open .account-options {
  opacity: 1;
  visibility: visible;
  pointer-events: all;
}

.account-option-selected,
.account-option {
  position: relative;
  font-weight: 300;
  cursor: pointer;
  transition: all 0.5s;
  display: flex;

}

.account-option-selected {
  width: 100%;
}

.account-option-selected .account-option-currency {
  text-align: right;
}

.account-option-amounts {
  flex: 1;
  padding: 5px 5px 5px 10px;
}

.account-option-bonus-amount,
.account-option-real-amount {
  display: flex;
  font-size: 12px;
  color: #ffffff;
}

.account-option-real-amount-icon,
.account-option-bonus-amount-icon {
  flex: 1;
}

.account-option-real-amount-icon img,
.account-option-bonus-amount-icon img {
  height: 14px;
  width: 14px;
}

.account-option-real-amount-sum,
.account-option-bonus-amount-sum {
  flex: 3;
  text-align: left;
  padding: 2px;
}

.account-option-bonus-amount-sum {
  font-size: 10px;
}

.account-option-currency {
  flex: 1;
  font-size: 12px;
  color: #ffffff;
  margin: auto;
}

.account-option:hover {
  cursor: pointer;
  background-color: #1a1840;
}

.account-option.selected {
  color: #ffffff;
  background-color: #305c91;
}

.arrow {
  position: relative;
  height: 20px;
  width: 20px;
}

.arrow {
  margin: 3px;
}

.arrow-img {
  height: 8px;
  width: 8px;
}

.open .arrow::before {
  left: -5px;
  transform: rotate(-45deg);
}

.open .arrow::after {
  left: 5px;
  transform: rotate(45deg);
}
</style>