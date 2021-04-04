<template>
  <div>
    <mainSlider/>

    <Navbar/>
    <gamesRow v-view.once="loadPopularGames" :gamesArr="popularGames" :titleRow="$t('home.popularGames')" :link=" '/game-groups/115' "/>
    <winners-row/>
    <gamesRow v-view.once="loadSlotGames" :gamesArr="slotsGames" :titleRow="$t('home.slots')" :link=" '/game-groups/126' "/>
    <gamesRow v-view.once="loadRecommendedGames" :gamesArr="recommendedGames" :titleRow="$t('home.recommended')" :link=" '/game-groups/124' "/>
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
import WinnersRow from "../components/WinnersRow";

export default {
  components: {WinnersRow, mainSlider, Navbar, gamesRow, newsRow, Banner, About},
  computed: {
    ...mapGetters({
      popularGames: "games/getPopular",
      slotsGames: "games/getSlots",
      recommendedGames: "games/getRecommended",
      currentLang: 'lang/getCurrent'
    }),
  },
  watch: {
    currentLang() {
      this.$store.dispatch("games/loadPopular")
      this.$store.dispatch("games/loadRecommended")
      this.$store.dispatch("games/loadSlots")
    },
  },
  methods: {
    loadPopularGames() {
      this.$store.dispatch("games/loadPopular")
    },
    loadSlotGames() {
      this.$store.dispatch("games/loadSlots")
    },
    loadRecommendedGames() {
      this.$store.dispatch("games/loadRecommended")
    }
  }
}
</script>