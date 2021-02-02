<template>
	<div class="col-lg-3 col-sm-6">
		<div class="game-box">
			<div class="game-image" :style="{'background-image': 'url(' + game.images[0].url + ')'}"> 
				<div class="play-layer">
					<router-link tag="div" :to="'/real-game/' + game.id.toString()" class="play-btn">
						<img src="../../assets/img/play.svg" alt="">
					</router-link>
					<router-link tag="span" :to="'/demo-game/' + game.id.toString()" v-if="!player">Demo</router-link>
				</div>
			</div>
			<div class="game-body">
				<div>
					<h3>{{game.name}}</h3>
					<p class="grey-txt">Slot games</p>
				</div>
				<div class="like" @click="like(game.id)" v-if="!game.is_favorite">
					<img src="../../assets/img/like.svg" alt="">
				</div>
				<div class="like-full" @click="unLike(game.id)" v-else>
					<img src="../../assets/img/likefull.svg" alt="">
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import {mapGetters} from 'vuex'
import axios from 'axios'

	export default{
		props: {
			game: {
				type: Object,
				required: true
			}
		},
		computed: {
			...mapGetters({ player: "auth/getPlayer"}),
		},
		methods:{
			unLike(id){
				this.game.is_favorite = false
				let request = {
				    is_favorite: false
				}
				axios
				.patch('http://api.casinoplatform.site/v3/games/' + id, request)
				.then(res =>{
					console.log(res)
				})
			},
			like(id){
				this.game.is_favorite = true
				let request = {
				    is_favorite: true
				}
				axios
				.patch('http://api.casinoplatform.site/v3/games/' + id, request)
				.then(res =>{
					console.log(res)
				})
			}
		}
	}
</script>

