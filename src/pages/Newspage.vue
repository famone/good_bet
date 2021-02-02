<template>
  <div>
    <Navbar/>

    <section id="news" v-if="newsItem">
      <div class="container">
        <h2 class="to-upper2">{{ newsItem.name }}</h2>
        <div class="date">{{ new Date(newsItem.publish_date * 1000).toLocaleDateString() }}</div>
      </div>
    </section>
    <section id="newsBg" :style="{'background-image': 'url(' + newsItem.image.url + ')'}"></section>
    <section id="news">
      <div class="container">
        <p class="white-txt" v-html="newsItem.body"></p>
      </div>
    </section>
  </div>
</template>

<script>
import Navbar from '../components/ui/Navbar.vue'
import axios from 'axios'
import {API} from "../api";

export default {
  components: {Navbar},
  data() {
    return {
      newsItem: {}
    }
  },
  created() {
    let routeId = parseInt(this.$route.params.id)


    API.get('news/' + routeId)
        .then(response => {
          this.newsItem = response.data
        })
  }
}
</script>