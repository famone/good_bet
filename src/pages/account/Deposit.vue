<template>
  <div>
    <Navbar/>


    <section id="account" v-if="player">
      <div class="container">
        <div class="row">
          <AcNav/>
          <div class="col-lg-9">
            <h2>DEPOSIT</h2>
            <div class="row">

              <div class="col-lg-12 text-center" v-if="!paymentMethods">
                <img src="../../assets/img/icons/nv6.svg" class="spin">
              </div>

              <!-- {{paymentMethods}} -->
              <div class="col-lg-4 text-center" v-else v-for="pay in paymentMethods">
                <div class="payment-card">
                  <img :src="pay.images[0].url" v-if="pay.images.length > 0">
                  <img src="../../assets/img/coin.svg" v-else="" class="logoimg">
                  <br>
                  <button class="save-btn" @click="openPop(pay)">top up an account</button>
                </div>
                <h4>{{ pay.name }}</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>


    <div class="deposit-pop" v-if="payMethod !== null" @click="closePop">
      <div class="deposit-pop-box" @click.stop>

        <label for="amount">Amount</label>
        <input id="amount" type="number" name="amount" v-model="amount">

        <div v-for="field in payMethod.fields">
          <label for="">{{ field.name }}</label>
          <input id="" type="text" v-model="field.value">
        </div>

        <button type="submit" class="reg-btn" @click="setPayment">{{ $t('pages.account.depositMoney') }}</button>
      </div>
    </div>

  </div>
</template>


<script>
import Navbar from '../../components/ui/Navbar.vue'
import AcNav from '../../components/ui/AcNav.vue'
import {mapGetters} from 'vuex'
import {API} from "../../api";

export default {
  components: {Navbar, AcNav},
  data() {
    return {
      paymentMethods: null,
      payMethod: null,
      amount: 0,
      acceptPop: false,
      comission: '',
      fee: '',
      transId: 0
    }
  },
  computed: {
    ...mapGetters({player: "auth/getPlayer"})
  },
  created() {

    API.get('payment-methods', {
      params: {
        expand: 'fields,images',
        direction: 'deposit',
      }
    }).then(res => {
      this.paymentMethods = res.data
      this.fee = res.data.fee_amount_as_currency
    })
  },
  methods: {
    cancel() {
      this.acceptPop = false
      this.payMethod = null
    },
    accept() {
      let pendingStatus = 'pending'

      API.patch('payments/' + this.transId, pendingStatus)
          .then(res => {
            this.$router.replace("/transactions")
          })
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
        direction: "deposit",
        amount: parseInt(this.amount),
        callbacks: [
          {
            type: "success",
            redirect_uri:  currentUrl + "/success"
          },
          {
            type: "fail",
            redirect_uri: currentUrl + "/fail"
          }
        ]
      }

      console.log(request)

      API.post('payments', request)
          .then(res => {
            this.acceptPop = true

            this.transId = res.data.id

            if (res.data.redirect_url !== '') {
              window.location.href = res.data.redirect_url
            } else {
              this.$router.replace('/success')
            }
          })

    }
  }
}

</script>