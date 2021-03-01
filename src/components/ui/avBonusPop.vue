<template>
	<div class="mes-pop" @click="closeAvDesc">
		<div class="mes-pop-box" @click.stop>			
			<h2>{{availableDesc.title}}</h2>
			<br>
			<p class="white-txt" v-html="availableDesc.description"></p>
			<br>
			<button class="save-btn">APPLY BONUS</button>
		</div>
	</div>
</template>


<script>

	export default{
		props: {
			availableDesc: {
				required: true,
				type: Object
			}
		},
		methods: {
			closeAvDesc(){
				this.$emit('closeAvDesc')
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