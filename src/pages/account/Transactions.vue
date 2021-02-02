<template>
	<div>
		<Navbar />


		<section id="account" v-if="player">
			<div class="container">
				<div class="row">
					<AcNav />
					<div class="col-lg-9">
						<h2>transactions</h2>

						<button class="switch-btn" 
						:class="{activeSwitch : switchDepo}" 
						@click="changeDepo(true)">Deposit</button>
						<button class="switch-btn" 
						:class="{activeSwitch : !switchDepo}" 
						@click="changeDepo(false)">Withdrawal</button>

						<!-- depo -->

						<div class="row" v-if="switchDepo">
							<div class="col-lg-10">
								<table>
								<thead>
									<tr>
						        		<td>Date</td>
						       	 		<td>Amount</td>
						       	 		<td>Status</td>
						    		</tr>
								</thead>
						    		<tbody>
										<tr v-for="dep in depositTrans">
						        			<td> 
						        				{{new Date(dep.time_create_as_iso8601).toLocaleDateString()}}
						        				{{new Date(dep.time_create_as_iso8601).getHours()}}:{{new Date(dep.time_create_as_iso8601).getMinutes()}}
						        			</td>
						       	 			<td>{{dep.amount_as_currency}}</td>
						       	 			<td>{{dep.status}}</td>
						    			</tr>
									</tbody>
								</table>
							</div>
						</div>

						<!-- withdrawl -->


						<div class="row" v-else>
							<div class="col-lg-10">
								<table>
								<thead>
									<tr>
						        		<td>Date</td>
						       	 		<td>Amount</td>
						       	 		<td>Status</td>
						    		</tr>
								</thead>
						    		<tbody>
										<tr v-for="dep in withdrawalTrans">
						        			<td> 
						        				{{new Date(dep.time_create_as_iso8601).toLocaleDateString()}}
						        				{{new Date(dep.time_create_as_iso8601).getHours()}}:{{new Date(dep.time_create_as_iso8601).getMinutes()}}
						        			</td>
						       	 			<td>{{dep.amount_as_currency}}</td>
						       	 			<td>{{dep.status}}</td>
						    			</tr>
									</tbody>
								</table>
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
				depositTrans: null,
				withdrawalTrans: null
			}
		},
		computed: {
			...mapGetters({ player: "auth/getPlayer", switchDepo: "auth/getSwitchDepo" })
		},
		created(){
			axios
			.get('http://api.casinoplatform.site/v3/payments?direction=deposit')
			.then(res =>{
				this.depositTrans = res.data
			})

			axios
			.get('http://api.casinoplatform.site/v3/payments?direction=withdrawal')
			.then(res =>{
				this.withdrawalTrans = res.data
			})
		},
		methods: {
			changeDepo(res){
				console.log(res)
				this.$store.dispatch('auth/depoSwitcher', res)
			}
		}
	}

</script>