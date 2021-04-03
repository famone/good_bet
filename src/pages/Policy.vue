<template>
	<div>
		<Navbar />

		<section id="policy">
			<div class="container">
				<div class="col-lg-12">
					<h2 class="mb-30">PRIVACY POLICY</h2>
					<p class="white-txt" v-html="infoPage.body"></p>
				</div>
			</div>
		</section>
	</div>
</template>

<script>
import Navbar from '../components/ui/Navbar.vue'
import {mapGetters} from "vuex";

export default{
	components: {Navbar},
  computed: {
    ...mapGetters({
      currentLang: 'lang/getCurrent',
      infoPage: 'infoPages/getResponsibleGaming'
    })
  },
  watch: {
	  currentLang() {
      this.$store.dispatch('infoPages/loadResponsibleGamingPage')
    }
  },
  created() {
	  this.$store.dispatch('infoPages/loadResponsibleGamingPage')
  }
}
</script>