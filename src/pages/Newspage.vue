<template>
	<div>
		<Navbar />

		
		<section id="news">
			<div class="container">
				<h2 class="to-upper2">{{newsItem.name}}</h2>
				<div class="date">{{ new Date(newsItem.publish_date  * 1000).toLocaleDateString()}}</div>
			</div>
		</section>
		<section id="newsBg"></section>
		<section id="news">
			<div class="container">
				<p class="white-txt" v-html="newsItem.body"></p>
			</div>
		</section>
	</div>
</template>

<script>
import {mapGetters} from 'vuex'
import Navbar from '../components/ui/Navbar.vue'
import axios from 'axios'

export default{
	components: {Navbar},
	data(){
		return{
			newsItem: {}
		}
	},
	created(){
		let routeId = parseInt(this.$route.params.id)

		axios
		.get('http://api.casinoplatform.site/v3/news/' + routeId)
		.then(response =>{
			console.log(response.data)
			this.newsItem = response.data
		})
	}
}
</script>