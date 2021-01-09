<template>
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
</template>


<script>
import axios from 'axios'
import gameBox from '../components/ui/gameBox.vue'

	export default{
		components: { gameBox },
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