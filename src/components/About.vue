<template>
	<section id="aboutCasino">
		<div class="container">
			<div class="col-lg-12" v-if="infoPage">
				<div class="about-box">
				<h2>{{infoPage.name}}</h2>
				<p class="white-txt" v-html="infoPage.body"></p>
			</div>
			</div>
		</div>
	</section>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  computed: {
    ...mapGetters({
      currentLang: 'lang/getCurrent',
      infoPage: 'infoPages/getAbout'
    })
  },
  watch: {
    currentLang() {
      this.$store.dispatch('infoPages/loadAboutPage')
    }
  },
  created() {
    this.$store.dispatch('infoPages/loadAboutPage')
  },
}
</script>
