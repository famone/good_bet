<template>
  <div>
    <Navbar/>

    <section id="news">
      <div class="container">
        <div class="col-lg-12 text-center" v-if="!news">
          <img src="../assets/img/icons/nv6.svg" class="spin">
        </div>

        <div class="col-lg-4" v-for="item in news" v-bind:key="item.id">
          <div class="news-card">
            <div class="news-img">
              <div class="read-news">
                <router-link tag="div" :to=" '/news/' + item.id " class="read-btn">
                  <img src="../assets/img/see.svg" alt="">
                </router-link>
              </div>
            </div>
            <div class="news-body">
              <div class="date">{{ new Date(item.publish_date * 1000).toLocaleDateString() }}</div>
              <h3>{{ item.name }}</h3>
              <p class="news-descr" v-html="item.preview.substring(0,100) + '...' "></p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import Navbar from '../components/ui/Navbar.vue'

export default {
  components: {Navbar},
  computed: {
    ...mapGetters({news: "news/getAll"}),
  },
  created() {
    this.$store.dispatch("news/loadAll");
  }
}
</script>