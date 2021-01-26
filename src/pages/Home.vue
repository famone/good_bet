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
import mainSlider from '../components/mainSlider.vue'
import Navbar from '../components/ui/Navbar.vue'
import newsRow from '../components/newsRow.vue'
import gamesRow from '../components/gamesRow.vue'
import Banner from '../components/Banner.vue'
import About from '../components/About.vue'
import axios from 'axios'

  export default{
  	components: { mainSlider, Navbar, gamesRow, newsRow, Banner, About },
    data(){
      return{
        popularGames: [],
        slotsGames: [],
        recomendedGames: []
      }
    },
    created(){
      // popular games
      axios
      .get('http://api.casinoplatform.site/v3/games?expand=details,launch_types,images,type,provider,canonical&group_id=115')
      .then(res => {
         
          this.popularGames = res.data
       })

      // slots games
      axios
      .get('http://api.casinoplatform.site/v3/games?expand=details,launch_types,images,type,provider,canonical&group_id=126')
      .then(res => {
          this.slotsGames = res.data
       })

      // recomended games
      axios
      .get('http://api.casinoplatform.site/v3/games?expand=details,launch_types,images,type,provider,canonical&group_id=124')
      .then(res => {
         this.recomendedGames = res.data
       })


    }
  }
</script>