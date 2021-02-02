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
								{{doc}}
								<div class="document-box text-center">
									<div class="text-center">
										<p class="white-txt">{{doc.value}}</p>
										<div class="add-doc"></div>
										<!-- <div class="whait-doc"></div>
										<div class="ok-doc"></div> -->
									</div>
								</div>
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
				documents: null
			}
		},
		computed: {
			...mapGetters({ player: "auth/getPlayer"})
		},
		created(){
			axios
			.get('http://api.casinoplatform.site/v3/player-uploads')
			.then(res =>{
				this.documents = res.data
			})

			// player-upload-types
			// /v3/player-uploads

		}
	}

</script>