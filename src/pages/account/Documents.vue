<template>
	<div>
		<Navbar />


		<section id="account" v-if="player">
			<div class="container">
				<div class="row">
					<AcNav />
					<div class="col-lg-9">
						<h2>DOCUMENTS</h2>

						<div class="row">
							<div class="col-lg-12 text-center" v-if="!documents">
								<img src="../../assets/img/icons/nv6.svg" class="spin">
							</div>
							<div class="col-lg-3" v-else v-for="doc in documents">
								<div class="document-box text-center">
									<div class="text-center">


										<a class="download-link" target="_blank" :href="doc.file_preview">Download document</a>
										<p class="white-txt">{{doc.type.value}}</p>
										<img src="../../assets/img/success.svg" class="status-icon" 
										v-if="doc.status === 'verified' ">
										<img src="../../assets/img/new.svg" class="status-icon" 
										v-if="doc.status === 'new' ">
										<img src="../../assets/img/progress.svg" class="status-icon" 
										v-if="doc.status === 'in_progress' ">
										<img src="../../assets/img/declined.svg" class="status-icon" 
										v-if="doc.status === 'declined' ">
									</div>
								</div>
							</div>
						</div>

						<br><br>

						<h2>ADD DOCUMENT</h2>

						<div class="row new-doc" v-if="avilable">
							<div class="col-lg-4">
								<select name="" id="" v-model="addedId">
									<option v-for="av in avilable" :value="av.id">{{av.value}}</option>
								</select>
							</div>
							<div class="col-lg-4">
								<input type="file" @change="changeFile($event)">
							</div>
						</div>

						<div class="row">
							
							<div class="col-lg-3">
								<button class="save-btn" @click="applyDocs">APPLY DOCUMENT</button>
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
				documents: null,
				avilable: null,
				addedId: null,
				addedFile: ''
			}
		},
		computed: {
			...mapGetters({ player: "auth/getPlayer"}),
		},
		methods: {
			getDocName(id){
				let docum = this.avilable.find(item => {
					return item.id == id
				})
				return docum.value
			},
			changeFile(e){
				this.addedFile = event.target.files[0]
			},
			applyDocs(){


				let emailBody = {
					type_id: this.addedId,
					file: this.addedFile
				}

				

				var form2 = new FormData();

				for (var field in emailBody){
					form2.append(field, emailBody[field]);
				};

				this.documents = null
			
				
				axios
				.post('http://api.casinoplatform.site/v3/player-uploads', form2)
				.then(res =>{
					axios
					.get('http://api.casinoplatform.site/v3/player-uploads?expand=type')
					.then(res =>{
						this.documents = res.data
					})
				})
			}
		}, 
		created(){
			axios
			.get('http://api.casinoplatform.site/v3/player-uploads?expand=type')
			.then(res =>{
				this.documents = res.data
				console.log(this.documents)
			})

			axios
			.get('http://api.casinoplatform.site/v3/player-upload-types')
			.then(res =>{
				this.avilable = res.data
			})

			// player-upload-types
			// /v3/player-uploads

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
</style>