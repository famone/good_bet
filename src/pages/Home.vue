<template>
  <div>
    <mainSlider/>

    <Navbar/>
    <gamesRow :gamesArr="popularGames" :titleRow="$t('home.popularGames')" :link=" '/game-groups/115' "/>
    <gamesRow :gamesArr="slotsGames" :titleRow="$t('home.slots')" :link=" '/game-groups/126' "/>
    <gamesRow :gamesArr="recommendedGames" :titleRow="$t('home.recommended')" :link=" '/game-groups/124' "/>
    <newsRow/>
    <Banner/>
    <About/>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import mainSlider from '../components/mainSlider.vue'
import Navbar from '../components/ui/Navbar.vue'
import newsRow from '../components/newsRow.vue'
import gamesRow from '../components/gamesRow.vue'
import Banner from '../components/Banner.vue'
import About from '../components/About.vue'

export default {
  components: {mainSlider, Navbar, gamesRow, newsRow, Banner, About},
  computed: {
    ...mapGetters({
      popularGames: "auth/getPopular",
      slotsGames: "auth/getSlots",
      recommendedGames: "auth/getRecommended"
    }),
  }
}
</script>