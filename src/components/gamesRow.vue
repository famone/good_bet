<template>
	<div class="games-row">
		<div class="container">
			<div class="games-row-box" v-if="gamesArr.length">
				<div class="games-row-top">


					<h2><!-- <img src="../assets/img/icons/nv3.svg" alt=""> -->{{titleRow}}</h2>
					<router-link class="see-all" tag="button" :to="link">{{ $t('games.seeAllLinkTitle')}}<img src="../assets/img/see.svg" alt=""></router-link>
				</div>

				<div class="row" v-if="gamesArr">
					<gameBox v-for="game in gamesArr.slice(0, 4)" v-bind:key="game.id" :game="game"/>
				</div>
			</div>

			<Skeletons v-else />
		</div>
	</div>
</template>


<script>
import gameBox from '../components/ui/gameBox.vue'
import {mapGetters, mapState} from 'vuex'
import Skeletons from '../components/Skeletons.vue'

export default{
	components: { gameBox, Skeletons },
	props: {
		gamesArr:{
			required: true,
			type: Array
		},
		titleRow: {
			required: true,
			type: String
		},
		link: {
			required: false,
			type: String
		}
	}
}
</script>