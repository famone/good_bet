<template>
	<div class="mes-pop" @click="closeMessage">
		<div class="mes-pop-box" @click.stop>
			<p class="small-white">{{activeMessage.time_create_as_iso8601}}</p>
			<br>
			<h2>{{activeMessage.title}}</h2>
			<br>
			<p class="white-txt" v-html="activeMessage.message"></p>
		</div>
	</div>
</template>


<script>

	export default{
		props: {
			activeMessage: {
				required: true,
				type: Object
			}
		},
		methods: {
			closeMessage(){
				this.$emit('closeMessage')
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
    position: relative;
    cursor: pointer;
}
</style>