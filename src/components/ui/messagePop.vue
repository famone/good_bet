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
