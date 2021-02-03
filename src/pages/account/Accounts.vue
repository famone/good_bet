<template>
	<div>
		<Navbar />


		<section id="account" v-if="player">
			<div class="container">
				<div class="row">
					<AcNav />
					<div class="col-lg-9">
						<h2>ACCOUNTS</h2>

						<div class="row">
							<div class="col-lg-12 text-center" v-if="!player.accounts">
								<img src="../../assets/img/icons/nv6.svg" class="spin">
							</div>


							<div class="col-lg-3" v-else v-for="account in player.accounts">
								<div class="document-box text-center">
									<div class="text-center">
										<img src="../../assets/img/success.svg" class="status-icon" 
										v-if="account.id == getCurrentAccount.id">
										<h3>{{account.amount.toLocaleString()}} {{account.currency_code}}</h3>
										<button class="btn-cont" v-if="account.id !== getCurrentAccount.id">Change account</button>
									</div>
								</div>
							</div>
						</div>

						<br><br>

						<h2>CREATE ACCOUNT</h2>

						<div class="row new-doc" v-if="available">
							<div class="col-lg-4">
								<select name="" id="" v-model="newAccountId">
									<option v-for="av in available" :value="av.id">{{av.code}}</option>
								</select>
							</div>
						</div>

						<div class="row">
							
							<div class="col-lg-3">
								<button class="save-btn" @click="createAccount">CREATE ACCOUNT</button>
							</div>
						</div>


					</div>
				</div>
			</div>
		</section>





	</div>
</template>


<script>
import Navbar from '../../components/ui/Navbar.vue'
import AcNav from '../../components/ui/AcNav.vue'
import {mapGetters} from  'vuex'
import axios from 'axios'

	export default{
		components: {Navbar, AcNav},
		data(){
			return{
				available: null,
				newAccountId: ''
			}
		},
		computed: {
			...mapGetters({ player: "auth/getPlayer"}),
			getCurrentAccount(){
				if(this.player){
					let currentValute = this.player.accounts.find(item => {
						return item.is_current == true
					})
					return currentValute
				}
			}
		},
		methods: {
			createAccount(){

				if(this.newAccountId === ''){
					return
				}

				let newAcc = {currency_id: this.newAccountId}

				axios
				.post('http://api.casinoplatform.site/v3/accounts', newAcc)
				.then(res =>{
					console.log(res.data)
					this.newAccountId = ''
					this.$store.dispatch('auth/getUser')
				})


			}
		}, 
		created(){
			// доступные валюты
			axios
			.get('http://api.casinoplatform.site/v3/payment-currencies?has_accounts=false')
			.then(res =>{
				console.log(res.data)
				this.available = res.data
			})
		}
	}

</script>

<style scoped>
select{	
	width: 100%!important;
}
input#file-upload-button{
	background-color: #fff!important;
	border:none!important;
	text-transform: uppercase!important;
}
.document-box h3{
	margin: 15px 0;
}
</style>