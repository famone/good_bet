<template>
	<section id="login">
		<div class="container">
			<div class="col-lg-6 col-lg-offset-3">
				<div class="form-box text-center">
					<h2>LOGIN</h2>
					<p class="white-txt">Sign in with your social network</p>
					<form>
						<input type="text" placeholder="E-mail" v-model="login">
						<input type="password" placeholder="Password" v-model="password">
						<div class="remember">
							<div class="remember-me" 
							:class="{checked: rememberUser}" 
							@click="rememberUser = !rememberUser">
								<div class="ch-box"></div>
								<span>Remember me</span>
							</div>
							<router-link tag="a" to="/recovery" class="under-link">Forgot password</router-link>
						</div>
						<button type="submit" @click.prevent="submitLog()" class="reg-btn">LOGIN</button>
					</form>
				</div>
			</div>
		</div>
	</section>
</template>


<script>
import axios from 'axios'
	export default{
		data(){
			return{
				rememberUser: false,
				login: '',
				password: ''
			}
		},
		methods: {
			submitLog(){


				let userLog = {
					grant_type: "password" ,
					username: this.login,
					password: btoa(this.password),
<<<<<<< HEAD
					scope: "casino:read bonus:read bonus.settings:read bonus:write lab:read lab:write game:read game:write game.history:read game.wallet:write player:read player:write player:write:all player:read:all  message:read game.launch:write"
=======
					scope: "casino:read bonus:read bonus.settings:read bonus:write lab:read lab:write game:read game:write game.history:read game.wallet:write player:read message:read player:write:all message:write news:read slider:read"
>>>>>>> 51cde4421dbb7babde30ec5db4b5fc00ceed5de1

				}
				console.log(userLog)



				let config = {
			        headers: {
			          Authorization: 'Basic ZnJvbnRfYmVhcmVyOg==',
			        } 
			    }

			axios
	  		.post('http://api.casinoplatform.site/v3/oauth2/token', userLog, config)
	  		.then(response => {

	  			// console.log(response)
	  			let token = response.data.access_token

	  			var object = {userToken: token, timestamp: new Date().getTime()}
				localStorage.setItem("userToken", JSON.stringify(object));

				this.$store.dispatch('auth/getUser')

	  		})
	  		.then(() => {
	        		this.$router.replace("/profile");
	      	});




			}
		}
	}
</script>
