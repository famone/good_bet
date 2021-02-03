<template>
	<div>
		<Navbar />
	<section id="groupPage">
		<div class="games-row">
		<div class="container">
			<div class="games-row-box">
				

				<div class="row">
					<div class="text-center" v-if="loader">
						<img src="../../assets/img/icons/nv6.svg" class="spin">
					</div>
					<div class="text-center" v-else-if="gamesArr < 1">
						<h3>Oops, No games yet!</h3>
					</div>

					<gameBox v-for="game in gamesArr" :game="game" v-else />
				</div>


			</div>
		</div>
	</div>
	</section>
	</div>
</template>


<script>
import axios from 'axios'
import Navbar from '../../components/ui/Navbar.vue'
import gameBox from '../../components/ui/gameBox.vue'

	export default{
		components: { gameBox, Navbar },
		data(){
			return{
				gamesArr: [],
				loader: true
			}
		},
		created(){
			axios
      		.get('http://api.casinoplatform.site/v3/games?expand=images&favorite')
      		.then(res => {
      			console.log(res.data)
         		this.gamesArr = res.data
         		this.loader = false
       		})
		},
	}
</script>