<template>
  <div>
    <Navbar/>


    <section id="account" v-if="player">
      <div class="container">
        <div class="row">
          <AcNav/>
          <div class="col-lg-9">
            <h2>{{ $t('pages.account.withdrawalUpper') }}</h2>
            <div class="row">

              <div class="col-lg-12 text-center" v-if="!paymentMethods">
                <img src="../../assets/img/icons/nv6.svg" class="spin" alt="">
              </div>

              <!-- {{paymentMethods}} -->
              <div class="col-lg-4 text-center" v-else v-for="method in paymentMethods.items">
                <div class="payment-card">
                  <img :src="method.images.items[0].url" v-if="method.images.length > 0" alt="">
                  <img src="../../assets/img/coin.svg" v-else class="logoimg" alt="">
                  <br>
                  <button class="save-btn" @click="openPop(method)">{{ $t('pages.account.withdrawalMoney') }}</button>
                </div>
                <h4>{{ method.name }}</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>


    <div class="deposit-pop" v-if="payMethod !== null" @click="closePop">
      <div class="deposit-pop-box" @click.stop>

        <label for="amount">{{ $t('main.amount') }}</label>
        <input id="amount" type="number" name="amount" v-model="amount">

        <div v-for="field in payMethod.fields">
          <label for="">{{ field.name }}</label>
          <input id="" type="text" v-model="field.value">
        </div>

        <div class="errors" v-for="(er, index) in errors ">
          <p style="color: red;">{{ index + 1 }}. {{ er.message }}</p>
        </div>

        <button type="submit" class="reg-btn" @click="setPayment">{{
            $t('pages.account.withdrawalMoneyUpper')
          }}
        </button>
      </div>
    </div>

    <div class="accept" v-if="acceptPop">
      <div class="deposit-pop-box text-center">

        {{ $t('pages.account.withdrawConfirmText', {amount: amount}) }}
        <br>
        <button class="cancel" @click="cancel">{{ $t('main.cancelUPPER') }}</button>
        <button type="submit" class="reg-btn" @click="accept">{{ $t('main.acceptUPPER') }}</button>
      </div>
    </div>

  </div>
</template>


<script>
import Navbar from '../../components/ui/Navbar.vue'
import AcNav from '../../components/ui/AcNav.vue'
import {mapGetters} from 'vuex'

export default {
  components: {Navbar, AcNav},
  data() {
    return {
      payMethod: null,
      amount: 0,
      acceptPop: false,
      comission: '',
      fee: '',
      transId: 0,
      errors: null
    }
  },
  computed: {
    ...mapGetters({
      player: "player/getCurrent",
      paymentMethods: "paymentMethod/getWithdrawalMethods"
    })
  },
  watch: {
    player(newVersion, oldVersion) {
      if (!newVersion || !oldVersion) {
        return;
      }

      let oldAccount = oldVersion.accounts.find(item => {
        if (item.is_current === true) {
          return item;
        }
      })

      let newAccount = newVersion.accounts.find(item => {
        if (item.is_current === true) {
          return item;
        }
      })

      if (oldAccount.id !== newAccount.id) {
        this.$router.go();
      }
    }
  },
  created() {
    this.$store.dispatch('paymentMethod/loadWithdrawalMethods');
  },
  methods: {
    cancel() {
      this.acceptPop = false
      this.payMethod = null
    },
    accept() {
      this.$store.dispatch('transactions/switchCurrentTab', 'withdrawal')

      this.$store.dispatch('transactions/changeTransactionStatus', this.transId, 'pending')
    },
    openPop(pay) {
      this.payMethod = pay
      this.payMethod.fields.forEach(item => {
        item.value = '';
      })
    },
    closePop() {
      this.payMethod = null
      this.amount = ''
    },
    setPayment() {


      let newField = []

      this.payMethod.fields.forEach(item => {
        newField.push({id: item.id, value: item.value})
      })

      let currentUrl = process.env.CASINO_APP_URL

      let request = {
        method_id: this.payMethod.id,
        fields: newField,
        direction: "withdrawal",
        amount: parseInt(this.amount),
        callbacks: [
          {
            type: "success",
            redirect_uri: currentUrl + "/success"
          },
          {
            type: "fail",
            redirect_uri: currentUrl + "/fail"
          }
        ]
      }

      this.$store.dispatch('transactions/createWithdrawalTransaction', request).then(response => {
        this.transId = response.data.id

        if (response.data.fee_amount > 0) {
          this.acceptPop = true
        } else {
          this.accept()
        }

        if (response.data.redirect_url !== '') {
          window.location.href = response.data.redirect_url
        } else {
          this.$router.replace('/fail')
        }
      }).catch(error => {
        this.errors = error.response.data
      })
    }
  }
}

</script>