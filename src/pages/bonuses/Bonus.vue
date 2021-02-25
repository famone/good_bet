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

            <section>
              <div class="container">
                <p class="white-txt" v-html="bonus.description"></p>
              </div>
            </section>
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
import {API} from "../../api";

export default {
  components: {Navbar},
  data() {
    return {
      bonus: false
    }
  },
  created() {
    let routeId = parseInt(this.$route.params.id)

    API.get('lab/bonuses/' + routeId, {
      params: {
        expand: 'banners, budgets, accrual_rules, wagering_rules, free_spin_rules',
      }
    }).then(response => {
      this.bonus = response.data
    })
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