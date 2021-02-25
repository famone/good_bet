<template>
  <div>
    <Navbar/>

    <section id="bonus-list">
      <div class="container">
        <div class="col-lg-12">
          <h2 class="mb-30">Bonuses</h2>

          <div v-if="bonuses">
            <div v-for="bonus in bonuses" v-bind:key="bonus.id" class="col-lg-2">
              <div class="news-card">
                <div class="news-img">
                  <div class="read-news">
                    <router-link tag="div" :to=" '/bonus/' + bonus.id " class="read-btn">
                    </router-link>
                  </div>
                </div>
                <div class="news-body">
                  <h3>{{ bonus.title }}</h3>
                  <p class="news-descr">{{ bonus.description}}</p>
                </div>
              </div>
            </div>
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
import Navbar from '../../components/ui/Navbar.vue'
import { API } from '../../api'

export default {
  components: { Navbar },
  data () {
    return {
      bonuses: false
    }
  },
  created () {
    API.get('lab/bonuses')
        .then(response => {
          this.bonuses = response.data
        })
  }

}
</script>