<template>
	<div>
		<Navbar />

		<section id="account" v-if="player">
			<div class="container">
				<div class="row">
					<AcNav />
					<div class="col-lg-9">
						<div class="row">
							<div class="row ma-0">
								<div class="col-lg-6">
									<div class="ava-edit">
										<div class="ava-box-edit">
											<div class="avatar" v-if="player.avatars" :style="{'background-image': 'url(' + player.avatars[0].url + ')'}"></div>
											<div class="avatar" v-else>
												<span>{{player.nickname.substr(0, 1)}}</span>
											</div>
											<h4>Edit avatar</h4>
										</div>	
										<input type="file" ref="file" multiple @change="changeAvatar">
										<div class="edit-btn"></div>
									</div>
								</div>
							</div>
							<div class="col-lg-6">
								<label for="">Nickname</label>
								<input type="text" :value="player.nickname">
							</div>
							<div class="col-lg-6">
								<label for="">E-mail</label>
								<input type="text" :value="player.email">
							</div>
							<div class="col-lg-6">
								<label for="">Login</label>
								<input type="text" :value="player.username">
							</div>
							<div class="col-lg-6">
								<label for="">Name</label>
								<input type="text" :value="player.name">
							</div>
							<div class="col-lg-6">
								<label for="">Last name</label>
								<input type="text" :value="player.surname">
							</div>

							<div class="col-lg-6">
								<label for="">Sex</label>
								<select name="" id="" v-model="player.gender">
									<option value="null"></option>
									<option value="male">male</option>
									<option value="female">female</option>
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
		},
		data(){
			return{
				file: null
			}
		},
		methods: {
			changeAvatar(){
				 this.file = this.$refs.file.files[0];

				 console.log(this.file)


				 return
				

				 let formData = new FormData();
				 formData.append('file', this.file);

				  console.log(formData)


				//   axios
	  	// 	.post('http://api.casinoplatform.site/v3/player-avatars', formData)
	  	// 	.then(response => {
	  	// 		let token = response.data.access_token

	  	// 		var object = {appToken: token, timestamp: new Date().getTime()}
				// localStorage.setItem("appToken", JSON.stringify(object));

	  	// 	})
			}
		}
	}
</script>