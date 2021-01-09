<template>
	<div>
		<Navbar />

		<section id="about">
			<div class="container">
				<div class="col-lg-6">
					<h2 class="mb-30">KING’S CASINO</h2>
					<p class="white-txt">Welcome to Rajbet ! You've just found a place where you can not only bet on all your favorite games in one place whenever you like, but you can also take advantage of plenty of top promotions, bonuses and other perks along the way.
					<br><br>
					We've dedicated ourselves to giving you more ways to inject extra passion into the slots you love by offering over 2000 unique slot machines with fantastic bonus.
					<br><br>
					Plus, you've got the freedom to choose between classic and modern online slot machines. Also, Rajbet offer huge variety of live casino games with high bet limits and huge winnings!
					<br><br>
					You'll find an impressive variety of payment methods to choose from and a transaction process that's quick and easy, letting you get straight back into the sports action.
					And when it's time to cash out your winnings, you can do so quickly and safely.
					<br><br>
					We're here for you every step of the way with dedicated account managers standing by to provide you with a 24/7 top notch customer care service, handling any issues quickly and efficiently.
					<br><br>
					And if that wasn't enough, you also get access to regular promotions, special offers and extra bonuses, giving you the best chances of scoring even more on all your favourite games at Rajbet.</p>
				</div>

				<div class="col-lg-6">
					<h2 class="mb-30">CONTACT US</h2>
					<form class="contact-us">
						<input type="text" placeholder="Name" :class="{errorInp : $v.name.$dirty && !$v.name.required}" v-model="name">
						<input type="text" placeholder="E-mail" v-model="email"
						:class="{errorInp : ($v.email.$dirty && !$v.email.required) || ($v.email.$dirty && !$v.email.email)}">
						<input type="text" placeholder="Topic" v-model="topic">
						<select name="" id="" v-model="category">
							<option value="">Select category</option>
							<option value="Category 1">Category 1</option>
							<option value="Category 2">Category 2</option>
						</select>
						<textarea placeholder="Message text" v-model="message"></textarea>
						<button type="submit" class="reg-btn" @click.prevent="submiitForm()">SEND</button>
					</form>
				</div>
			</div>
		</section>
	</div>
</template>

<script>
import Navbar from '../components/ui/Navbar.vue'
import { required, email, minLength } from "vuelidate/lib/validators";
import axios from 'axios'

export default{
	components: {Navbar},
	methods: {
		submiitForm(){
			if(this.$v.$invalid) {
				this.$v.$touch();
				return;
			}
		let feedback = {
    	name: this.name,
    	email: this.email,
    	section: this.category,
    	subject: this.topic,
    	message: this.message,
    	recaptcha_response: '03AO9ZY1DsBzhY-s33vFKuCxtRlUO5U6L4ZBympIIniv9ne9fr4duZN79F7C2aqp_-7kn6ir6TXz6Qbf9Kvm8Nc_J8FG8m8hM1OBzm2DW8AdNi4we54jQgfqrFLDZbTtbFBPbx-JnaVIk1A2Kewv5SIxqgWRFvoNYeGFF8haubTR0xo1zs4ggnN7xCDV5oCc7-E8HKRtUNXKPz-AQ7EmY0zLHYFLIovX140ePHz6uYWRkLFatSMLF7dv4vhhGe0o2RbXraNcjYSrcs9cz0UoONPDJf7MZW3VE_dpksqWK2xx9K9Lz7unEpYsfv2sDiB-4FJ-SM9qXg3qgQ'
    	}
		
		console.log(feedback)


		axios
	  		.post('http://api.casinoplatform.site/v3/feedback', feedback)
	  		.then(response => {
	  			console.log(response)
	  		})
	  		.catch(error => console.log(error))
		
	}
	},
	data(){
		return{
			email: '',
			name: '',
			topic: '',
			category: '',
			message: ''
		}
	},
	validations: {
			email:{
				required,
				email
			},
			name:{
				required
			}
		},

}
</script>

<style>
.errorInp{
	border:1px red solid!important;
}
</style>