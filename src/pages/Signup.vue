<template>
	<section id="login">
		<div class="container">
			<div class="col-lg-6 col-lg-offset-3">
				<div class="form-box text-center">
					<h2>REGISTRATION</h2>
					
					<form>
						<!-- <input type="text" placeholder="E-mail">
						<input type="password" placeholder="Password">
						<input type="password" placeholder="Validate password">
						<p class="small-white">
							I agree to receive newsletter from RajBet with information about software updates and new offers. <br><br>
							I unconditionally agree with "Terms & Conditions", "Data Policy", "Cookie Policy" and that I am older than 18 years old.
						</p>
						<div class="remember just-center">
							<div class="remember-me" 
							:class="{checked: agreement}" 
							@click="agreement = !agreement">
								<div class="ch-box"></div>
								<span>I agree</span>
							</div>
						</div> -->

						<div class="field-box" v-for="field in regFields[0].fields">
							<div v-if="field.id == 6">
								<label for="">{{field.inputs[0].label}}</label>
								<select name="" id="" :ref=" 'input' + field.id ">
									<option v-for="opt in currency" :value="opt.code">{{opt.code}}</option>	
								</select>
							</div>

								<div class="remember-me" v-else-if="field.id == 13" 
									:class="{checked: agreement}" 
									@click="agreement = !agreement">
									<div class="ch-box"></div>
									<span>{{field.inputs[0].label}}</span>
								</div>

								<div class="remember-me" v-else-if="field.id == 12" 
									:class="{checked: mailSpam}" 
									@click="mailSpam = !mailSpam">
									<div class="ch-box"></div>
									<span>{{field.inputs[0].label}}</span>
								</div>
								
								

							<div v-else>
								<label for="">{{field.inputs[0].label}}</label>
								<input :type="field.type" :ref=" 'input' + field.id "> 
							</div>



						</div>

						<button @click.prevent="submitForm" type="submit" class="reg-btn">LOGIN</button>
					</form>


					
					
				</div>
			</div>
		</div>
	</section>
</template>


<script>
import axios from 'axios'
import {mapGetters} from 'vuex'

	export default{
		data(){
			return{
				agreement: false,
				mailSpam: false,
				agreement: false
			}
		},
		computed:{
			...mapGetters({ 
				regFields: "auth/getRegFields",
				currency: "auth/getCurrency"
			}),
		},
		methods: {
			submitForm(){
				// console.log(regFields[0].fields)
					
					console.log(this.$refs.input1[0].value)
					console.log(this.$refs.input2[0].value)
					console.log(this.$refs.input5[0].value)
					console.log(this.$refs.input6[0].value)
					console.log(this.mailSpam)
					console.log(this.agreement)
			
			}
		}
	}
</script>


<style scoped>
	.remember-me{
		margin-bottom: 15px;
	}
</style>
