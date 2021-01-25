<template>
	<div>
		<Navbar />

		<section id="gameSec">
			<div class="container">
				<div class="row">
					<div class="col-lg-8">
					<div class="breadcrumbs">
						<h2><router-link tag="span" to="/games" class="br-link">GAMES</router-link> / 
							<span class="to-upper">{{gameName}}</span>
						</h2>
						<div class="tool-btns">
							
						</div>
					</div>
					<div class="conection text-center" v-if="gameLauncher === '' ">
						<br><br>
						<img src="../assets/img/icons/nv6.svg" class="spin">
						<p class="white-txt">Connecting</p>
						<br><br>
					</div>
					<div class="game-louncher" v-else>
						<iframe :src="gameLauncher" frameborder="0"></iframe>
					</div>
				</div>
				<div class="col-lg-4">
					<accordeons />
				</div>
				</div>
			</div>
		</section>
		
	</div>
</template>


<script>
import {mapGetters} from 'vuex'
import Navbar from '../components/ui/Navbar.vue'
import accordeons from '../components/ui/accordeons.vue'
import axios from 'axios'

	export default{
		components: {Navbar, accordeons},
		data(){
			return{
				gameLauncher: '',
				gameName: '',
				gameObj: ''
			}
		},
		computed:{
			...mapGetters({ games: "auth/getGames"}),
		},
		created(){
      this.$store.dispatch('auth/getAppToken')

      let routeId = parseInt(this.$route.params.id)

			let gameConfig = {
				game_id: routeId,
     			launch_type: "real"
			}

			

			axios
			.post('http://api.casinoplatform.site/v3/game-launches', gameConfig)
			.then(response =>{
				this.gameLauncher = response.data.launch_url
				this.gameObj = response.data
			})

			axios
			.get('http://api.casinoplatform.site/v3/games/' + routeId )
			.then(response =>{
				this.gameName = response.data.name
			})
		},
		mounted(){
			setInterval(()=>{
				this.$store.dispatch('auth/getUser')
			}, 3000)
		},
		beforeDestroy(){
			// let routeId = parseInt(this.$route.params.id)
			// let close_token =  this.gameObj.close_token
			// axios
			// .patch('http://api.casinoplatform.site/v3/game-launches/' + routeId, close_token)
			// .then(res => {
			// 	console.log(res)
			// })
		}
	}
</script>


<style>
	
</style>