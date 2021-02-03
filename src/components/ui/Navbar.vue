<template>
	<div class="navbar" :class="{ma140 : this.$route.path !== '/'}">
		<div class="container">
			<div class="navbar-box" @click="chDynamicly($emit)">
				<router-link tag="div" :to=" '/game-groups/' + item.id" class="navbar-btn text-center" v-for="(item, index) in categories">
					<img :src="item.icon" alt="">
					<p class="small-white">{{ $t(item.name) }}</p>
				</router-link>
			</div>
		</div>
	</div>
</template>



<script>
import {mapGetters} from 'vuex'

	export default{
		computed: {
			...mapGetters({ groups: "auth/getGroups"}),
		},
		methods: {
			chDynamicly(){
				this.$emit('chDynPage')
			}
		},
		data(){
			return{
				categories: [
						{
							name: 'main.recommended',
							id: 124,
							icon: require('../../assets/img/icons/nv1.svg')
						},
						{
							name: 'main.new',
							id: 125,
							icon: require('../../assets/img/icons/nv2.svg')
						},
						{
							name: 'main.popular',
							id: 115,
							icon: require('../../assets/img/icons/nv3.svg')
						},
						{
							name: 'main.slots',
							id: 126,
							icon: require('../../assets/img/icons/nv4.svg')
						},
						{
							name: 'main.liveGame',
							id: 127,
							icon: require('../../assets/img/icons/nv5.svg')
						},
						{
							name: 'main.roulette',
							id: 128,
							icon: require('../../assets/img/icons/nv6.svg')
						},
						{
							name: 'main.card',
							id: 129,
							icon: require('../../assets/img/icons/nv7.svg')
						},
						{
							name: 'main.virtualSport',
							id: 130,
							icon: require('../../assets/img/icons/nv8.svg')
						},
						{
							name: 'main.loto',
							id: 131,
							icon: require('../../assets/img/icons/nv9.svg')
						},
						{
							name: 'main.tableGames',
							id: 132,
							icon: require('../../assets/img/icons/nv10.svg')
						},
				]
			}
		}
	}
</script>	