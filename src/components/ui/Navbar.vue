<template>
	<div class="navbar" :class="{ma140 : this.$route.path !== '/'}">
		<div class="container">
			<div class="navbar-box">
				<router-link tag="div" :to=" '/game-groups/' + item.id" class="navbar-btn text-center" v-for="(item, index) in categories">
					<img :src="item.icon" alt="">
					<p class="small-white">{{item.name}}</p>
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
		data(){
			return{
				categories: [
						{
							name: 'Recommended',
							id: 124,
							icon: require('../../assets/img/icons/nv1.svg')
						},
						{
							name: 'New',
							id: 125,
							icon: require('../../assets/img/icons/nv2.svg')
						},
						{
							name: 'Popular',
							id: 115,
							icon: require('../../assets/img/icons/nv3.svg')
						},
						{
							name: 'Slots',
							id: 126,
							icon: require('../../assets/img/icons/nv4.svg')
						},
						{
							name: 'Live game',
							id: 127,
							icon: require('../../assets/img/icons/nv5.svg')
						},
						{
							name: 'Roulette',
							id: 128,
							icon: require('../../assets/img/icons/nv6.svg')
						},
						{
							name: 'Card',
							id: 129,
							icon: require('../../assets/img/icons/nv7.svg')
						},
						{
							name: 'Virtual sport',
							id: 130,
							icon: require('../../assets/img/icons/nv8.svg')
						},
						{
							name: 'Loto',
							id: 131,
							icon: require('../../assets/img/icons/nv9.svg')
						},
						{
							name: 'Tablet Games',
							id: 132,
							icon: require('../../assets/img/icons/nv10.svg')
						},
				]
			}
		}
	}
</script>	