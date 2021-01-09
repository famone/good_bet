<template>
	<div class="col-lg-3">
		<div class="account-navigation">
			<h2>PROFILE</h2>
			<ul>
				<router-link tag="li" :to="item.link" v-for="item in profileNav">
					<img :src="item.icon" alt=""> <span>{{item.text}}</span>
				</router-link>
			</ul>
		</div>
	</div>
</template>


<script>
	export default{
		data(){
			return{
				profileNav: [
						{
							text: 'My profile',
							link: '/profile',
							icon: require('../../assets/img/icons/pr1.svg')
						},
						{
							text: 'Deposit',
							link: '/deposit',
							icon: require('../../assets/img/icons/pr2.svg')
						},
						{
							text: 'Cash withdrawal',
							link: '/cash-withdrawal',
							icon: require('../../assets/img/icons/pr3.svg')
						},
						{
							text: 'Transactions',
							link: '/transactions',
							icon: require('../../assets/img/icons/pr4.svg')
						},
						{
							text: 'My bonuses',
							link: '/my-bonuses',
							icon: require('../../assets/img/icons/pr5.svg')
						},
						{
							text: 'Documents',
							link: '/documents',
							icon: require('../../assets/img/icons/pr6.svg')
						},
				]
			}
		}
	}
</script>	