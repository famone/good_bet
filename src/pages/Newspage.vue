<template>
  <div>
    <Navbar/>

    <div class="col-lg-12 text-center" v-if="!news">
      <img src="../assets/img/icons/nv6.svg" class="spin" alt="">
    </div>

    <section v-if="news">
      <div class="container">
        <h2 class="to-upper2">{{ news.name }}</h2>
        <div class="date">{{ new Date(news.publish_date * 1000).toLocaleDateString() }}</div>
      </div>
    </section>
    <section v-if="news" id="newsBg" :style="{'background-image': 'url(' + news.image.url + ')'}"></section>
    <section v-if="news">
      <div class="container">
        <p class="white-txt" v-html="news.body"></p>
      </div>
    </section>
  </div>
</template>

<script>
import Navbar from '../components/ui/Navbar.vue'
import {mapGetters} from "vuex";

export default {
  components: {Navbar},
  computed: {
    ...mapGetters({news: "singleNews/getNews"}),
  },
  created() {
    this.$store.dispatch('singleNews/loadById', parseInt(this.$route.params.id))
  }
}
</script>