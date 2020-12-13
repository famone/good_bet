<template>
	<section id="login">
		<div class="container">
			<div class="col-lg-6 col-lg-offset-3">
				<div class="form-box text-center">
					<h2>LOGIN</h2>
					<p class="white-txt">Sign in with your social network</p>
					<form>
						<input type="text" placeholder="E-mail">
						<input type="password" placeholder="Password">
						<div class="remember">
							<div class="remember-me" 
							:class="{checked: rememberUser}" 
							@click="rememberUser = !rememberUser">
								<div class="ch-box"></div>
								<span>Remember me</span>
							</div>
							<router-link tag="a" to="/recovery" class="under-link">Forgot password</router-link>
						</div>
						<button type="submit" class="reg-btn">LOGIN</button>
					</form>
				</div>
			</div>
		</div>
	</section>
</template>


<script>
	export default{
		data(){
			return{
				rememberUser: false
			}
		}
	}
</script>