<template>
  <div>
    <Navbar/>

    <section id="news">
      <div class="container">
        <skeletons v-if="!news.length" :element-per-count="3" element-wrapper-class="col-lg-4 col-sm-6"/>

        <div class="col-lg-4 col-sm-6" v-else v-for="item in news" v-bind:key="item.id">
          <div class="news-card">
            <div class="news-img" :style="{backgroundImage: 'url(\'' + (item.image.url ? item.image.url : 'slider1.png') +'\')'}">
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
import Skeletons from "../components/Skeletons";

export default {
  components: {Skeletons, Navbar},
  computed: {
    ...mapGetters({news: "news/getAll"}),
  },
  created() {
    this.$store.dispatch("news/loadAll");
  }
}
</script>