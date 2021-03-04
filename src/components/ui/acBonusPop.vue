<template>
	<div class="mes-pop" @click="closeAcDesc">
		<div class="mes-pop-box" @click.stop>	
		<div class="cross" @click="closeAcDesc">✕</div>		
			<h2>{{activeDesc.bonus.title}}</h2>
			<br>
			<p class="white-txt" v-html="activeDesc.bonus.description"></p>
			<hr>
			<h4>Amount: x {{activeDesc.bonus.wagering_rules[0].amount_as_currency}}</h4>
                    <br>
                    <h4>Wager type: {{activeDesc.bonus.wagering_rules[0].wagering_type}}</h4>
		</div>
	</div>
</template>


<script>

	export default{
		props: {
			activeDesc: {
				required: true,
				type: Object
			}
		},
		methods: {
			closeAcDesc(){
				this.$emit('closeAcDesc')
			}
		}
	}
</script>

<style>
.mes-pop{
	position: fixed;
    z-index: 150;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgb(0, 0, 0, .7);
    display: flex;
    justify-content: center;
    align-items: center;
}	
.mes-pop-box{
	background-color: #1A1840;
    border-radius: 30px;
    padding: 20px;
    width: 50%;
}
</style>