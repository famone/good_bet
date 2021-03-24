<template>
	<div class="games-row">
		<div class="container">
			<div class="games-row-box" >
				<div class="games-row-top">
					<h2>{{titleRow}}</h2>
					<router-link class="see-all" tag="button" :to="link">{{ $t('games.seeAllLinkTitle')}}<img src="../assets/img/see.svg" alt=""></router-link>
				</div>

				<div v-if="gamesArr.length" class="row">
					<gameBox v-for="game in gamesArr.slice(0, 4)" v-bind:key="game.id" :game="game"/>
				</div>
        <Skeletons v-else />
			</div>


		</div>
	</div>
</template>


<script>
import gameBox from '../components/ui/gameBox.vue'
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