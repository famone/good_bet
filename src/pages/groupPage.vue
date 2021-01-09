<template>
	<div>
		<Navbar />
	<section id="groupPage">
		<div class="games-row">
		<div class="container">
			<div class="games-row-box">
				

				<div class="row">
					<gameBox v-for="game in gamesArr" :game="game"/>
				</div>

			</div>
		</div>
	</div>
	</section>
	</div>
</template>


<script>
import axios from 'axios'
import Navbar from '../components/ui/Navbar.vue'
import gameBox from '../components/ui/gameBox.vue'

	export default{
		components: { gameBox, Navbar },
		props: ["id"],
		data(){
			return{
				gamesArr: []
			}
		},
		created(){
			let link = this.$route.params.id.toString()
			axios
      		.get('http://api.casinoplatform.site/v3/games?expand=details,launch_types,images,type,provider,canonical&group_id=' + link)
      		.then(res => {
         		this.gamesArr = res.data
       		})
		}
	}
</script>