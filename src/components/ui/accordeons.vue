<template>
	<div class="accordeons">
		<div v-for="(item, index) in accs" :class="{accActive: item.active}">
			<div class="acc-btn" @click="openAc(index)" >
			<span>{{item.name}}</span>
			<img src="../../assets/img/downarr.svg" alt="">
		</div>
		<div class="acc-item">
			<p class="white-txt">{{item.desc}}</p>
		</div>
		</div>
	</div>
</template>


<script>
	export default{
		data(){
			return{
				accs: [
					{	
						name: 'Recent winners',
						desc: 'Lorem ipsum dolor sit amet, consectetur adipisicing, elit. Natus quod, itaque placeat possimus quos labore culpa eius magnam aliquam eos obcaecati molestias odit autem quisquam cum, et dolor perspiciatis quo atque, ad. Fuga, voluptatibus ipsum, autem corrupti dignissimos exercitationem temporibus.',
						active: false
					},
					{
						name: 'Game information',
						desc: 'Lorem ipsum dolor sit amet, consectetur adipisicing, elit. Natus quod, itaque placeat possimus quos labore culpa eius magnam aliquam eos obcaecati molestias odit autem quisquam cum, et dolor perspiciatis quo atque, ad. Fuga, voluptatibus ipsum, autem corrupti dignissimos exercitationem temporibus.',
						active: false
					},
					{
						name: 'Related gamesv',
						desc: 'Lorem ipsum dolor sit amet, consectetur adipisicing, elit. Natus quod, itaque placeat possimus quos labore culpa eius magnam aliquam eos obcaecati molestias odit autem quisquam cum, et dolor perspiciatis quo atque, ad. Fuga, voluptatibus ipsum, autem corrupti dignissimos exercitationem temporibus.',
						active: false
					},
					{
						name: 'Description',
						desc: 'Lorem ipsum dolor sit amet, consectetur adipisicing, elit. Natus quod, itaque placeat possimus quos labore culpa eius magnam aliquam eos obcaecati molestias odit autem quisquam cum, et dolor perspiciatis quo atque, ad. Fuga, voluptatibus ipsum, autem corrupti dignissimos exercitationem temporibus.',
						active: false
					},
				]
			}
		},
		methods: {
			openAc(index){
				this.accs.forEach(item =>{
						item.active = false
					})
					this.accs[index].active = !this.accs[index].active				
			}
		}
	}
</script>	