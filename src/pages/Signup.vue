<template>
	<section id="login">
		<div class="container">
			<div class="col-lg-6 col-lg-offset-3">
				<div class="form-box text-center">
					<h2>REGISTRATION</h2>
					
					<form>
						<input type="text" placeholder="E-mail">
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
				agreement: false
			}
		}
	}
</script>

