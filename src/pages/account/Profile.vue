<template>
	<div>
		<Navbar />

		<section id="account" v-if="player">
			<div class="container">
				<div class="row">
					<AcNav />
					<div class="col-lg-9">
						<div class="row">
							<div class="col-lg-6">
								<label for="">Nickname</label>
								<input type="text">
							</div>
							<div class="col-lg-6">
								<label for="">Login</label>
								<input type="text">
							</div>
							<div class="col-lg-6">
								<label for="">Name</label>
								<input type="text">
							</div>
							<div class="col-lg-6">
								<label for="">Last name</label>
								<input type="text">
							</div>

							<div class="col-lg-6">
								<label for="">Sex</label>
								<select name="" id="">
									<option value="null"></option>
									<option value="Male">Male</option>
									<option value="Female">Female</option>
								</select>
							</div>
							<div class="col-lg-6">
								<label for="">Birthday</label>
								<input type="date" :value="player.birthdate">
							</div>
							<div class="col-lg-6">
								<label for="">Country</label>
								<select name="" id="" v-model="player.country">
									<option value=""></option>
									<option :value="count.name" v-for="count in countries">{{count.name}}</option>
								</select>
							</div>
							<div class="col-lg-6">
								<label for="">Address</label>
								<input type="text">
							</div>
							<div class="col-lg-6">
								<label for="">City</label>
								<input type="text">
							</div>
							<div class="col-lg-6">
								<label for="">Timezone</label>
								<select name="" id="" v-model="player.timezone.name">
									<option value=""></option>
									<option :value="temezone.name" v-for="temezone in timezones">{{temezone.name}}</option>
								</select>
							</div>
							<div class="col-lg-12">
								<button class="save-btn">SAVE</button>
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
	
	export default{
		components: {Navbar, AcNav},
		computed: {
			...mapGetters({ player: "auth/getPlayer", 
				timezones: "auth/getZones",
				countries: "auth/getCountries" }),
		}
	}
</script>