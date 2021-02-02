<template>
	<div>
	  	 <mainSlider />

   	<Navbar />
    <gamesRow :gamesArr="popularGames" :titleRow="'POPULAR GAMES'" :link=" '/game-groups/115' " />
    <gamesRow :gamesArr="slotsGames" :titleRow="'SLOTS'" :link=" '/game-groups/126' " />
    <gamesRow :gamesArr="recomendedGames" :titleRow="'RECOMMENDED'" :link=" '/game-groups/124' " />
    <newsRow />
    <Banner />
    <About />
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
import axios from 'axios'

  export default{
  	components: { mainSlider, Navbar, gamesRow, newsRow, Banner, About },
    computed: {
      ...mapGetters({ 
          popularGames: "auth/getPopular",
          slotsGames: "auth/getSlots",
          recomendedGames: "auth/getRecomended"
        }),
    }
  }
</script>