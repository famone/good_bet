<template>
	<div class="games-row">
		<div class="container">
			<div class="games-row-box">
				<div class="games-row-top">
					<h2><img src="../assets/img/icons/nv4.svg" alt="">SLOTS</h2>
					<button class="see-all">See all <img src="../assets/img/see.svg" alt=""></button>
				</div>

				<div class="row">
					<gameBox v-for="game in games" :game="game"/>
				</div>

			</div>
		</div>
	</div>
</template>


<script>
import gameBox from '../components/ui/gameBox.vue'
import {mapGetters, mapState} from 'vuex'

export default{
	components: { gameBox },
	computed: {
		...mapGetters({ games: "auth/getGames"}),
	}
}
</script>