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
