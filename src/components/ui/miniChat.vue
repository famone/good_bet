<template>
	<div class="mini-chat">
		<div class="chat-box" v-for="mes in messages" @click="lookMes(mes)">
			<p>{{mes.title}}</p>
			<p class="small-white" v-html="mes.message.substr(0, 38) + '...' "></p>
			<div class="onliner" v-if="mes.status === 'delivered' "></div>
		</div>
	</div>
</template>


<script>
import {mapActions} from 'vuex'
import {API} from "../../api";

export default{
	props: {
		messages: {
			required: true,
			type: Array
		}
	},
	computed: {
		...mapActions({
	      		loadMessages: "auth/loadMessages",
			}),
	},
	methods: {
		lookMes(mes){
			this.$emit('lookMes', mes)


				let stat = {
					delivery_status: "read"
				}

				API.patch( `messages/${mes.id}`, stat)
				.then(res => {
					this.loadMessages
				})
			
		}
	}
}	
</script>


<style>
.mini-chat{
	position: absolute;
	top: 140%;
	left: 0;
	background-color: #0d0d25;
	border-radius:5px;
	height: 200px;
	overflow-y:scroll;
	width: 300px;
	padding: 10px;
}
.chat-box{
	margin-bottom: 10px;
	padding:5px 10px;
	cursor: pointer;
	transition: all .3s ease;
	border-radius: 5px;
	text-transform: none!important;
	position: relative;
}
.chat-box:hover{
	background-color: #272459;
}
.chat-box:before{
	content: '';
	width: calc(100% - 20px);
	height: 1px;
	background-color: #fff;
	opacity: 0.4;
	left: 10px;
	bottom: -2px;
	position: absolute;
}
.chat-box:hover::before{
	display: none;
}
.chat-box:last-child::before{
	display: none;
}
</style>