<template>
  <div>
    <Navbar/>

    <section id="bonus-content">
      <div class="container">
        <div class="col-lg-12">

          <div v-if="bonus">
            <section>
              <div class="container">
                <h2 class="mb-30">Bonus/{{ bonus.title }}</h2>
                <!--              <div class="date">{{ new Date(newsItem.publish_date * 1000).toLocaleDateString() }}</div>-->
              </div>
            </section>
            <section class="bonusBg"
                     :style="{'background-image': bonus.banners.length ? 'url(' + bonus.banners[0].url + ')' : ''}"></section>

            <section id="about">
              <div class="container">
                <p class="white-txt" v-html="bonus.description"></p>
                <br>
                <hr>
                <div class="row">
                  <div class="col-lg-6">
                    <h4>Amount: x {{bonus.wagering_rules[0].amount_as_currency}}</h4>
                    <br>
                    <h4>Wager type: {{bonus.wagering_rules[0].wagering_type}}</h4>
                  </div>
                  <div class="col-lg-6 text-right">
                    <button @click="openConfirmationPopup(bonus)" class="save-btn">SUBSCRIBE</button>
                  </div>
                </div>
              </div>
            </section>

            <SubscribePopup v-if="isBonusSubscriptionConfirmationPopup" :bonus="bonus" @cancelBonusSubscription="closeConfirmationPopup"/>
          </div>
          <div v-else>
            <h3>Bonuses not found</h3>
          </div>
        </div>
      </div>
    </section>
  </div>

</template>

<script>
import Navbar from "../../components/ui/Navbar";
import {mapGetters} from "vuex";
import SubscribePopup from "../../components/bonus/SubscribePopup";

export default {
  components: {SubscribePopup, Navbar},
  computed: {
    ...mapGetters({
      bonus: "bonus/getBonus"
    }),
  },
  data() {
    return {
      isBonusSubscriptionConfirmationPopup: false
    }
  },
  created() {
    let routeId = parseInt(this.$route.params.id)

    this.$store.dispatch('bonus/loadBonusById', routeId)
  },
  methods: {
    openConfirmationPopup() {
      this.isBonusSubscriptionConfirmationPopup = true
    },
    closeConfirmationPopup() {
      this.isBonusSubscriptionConfirmationPopup = false
    }
  }
}
</script>

<style scoped>
.bonusBg {
  height: 400px;
  background-image: url(../../assets/img/slider1.png);
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  margin-bottom: 60px;
}
</style>