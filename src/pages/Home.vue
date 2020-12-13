<template>
	<div>
	  	 <mainSlider />

   	<Navbar />
    <gamesRow />
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

  export default{
  	components: { mainSlider, Navbar, gamesRow, newsRow, Banner, About }
  }
</script>