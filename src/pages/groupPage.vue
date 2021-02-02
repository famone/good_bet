<template>
	<div>
		<Navbar @chDynPage="updateDynPage" />
	<section id="groupPage">
		<div class="games-row">
		<div class="container">
			<div class="games-row-box">
				

				<div class="row">
					<div class="text-center" v-if="loader">
						<img src="../assets/img/icons/nv6.svg" class="spin">
					</div>

					<div class="text-center" v-else-if="gamesArr < 1">
						<h3>Oops, No games yet!</h3>
					</div>
					<gameBox v-for="game in gamesArr" :game="game" v-else />
				</div>

        <ul id="pager">
          <li v-for="(pagerElem, index) in pagerItems()">
            <a @click="changePage(pagerElem.pageNumber)">{{pagerElem.title}}</a>
          </li>
        </ul>

			</div>
		</div>
	</div>
	</section>
	</div>
</template>


<script>
import axios from 'axios'
import Navbar from '../components/ui/Navbar.vue'
import gameBox from '../components/ui/gameBox.vue'

  const API_GAMES_ENDPOINT = process.env.VUE_APP_API_URL + 'games';
  const API_GAMES_DEFAULT_FIELDS = 'details,launch_types,images,type,provider,canonical';
	export default{
		components: { gameBox, Navbar },
		props: ["id"],
		data(){
			return{
				gamesArr: [],
        pageCount: 0,
        currentPage: 1,
				loader: true
			}
		},
		created() {
			let link = this.$route.params.id.toString()
      axios.get(API_GAMES_ENDPOINT, {
        params: {
          expand: API_GAMES_DEFAULT_FIELDS,
          group_id: link
        }
      }).then(this._resCallback.bind(this))
		},
		methods: {
		  changePage(pageNumber) {
        this.loader = true
        let link = this.$route.params.id.toString()
        axios.get(API_GAMES_ENDPOINT, {
          params: {
            expand: API_GAMES_DEFAULT_FIELDS,
            group_id: link,
            page: pageNumber
          }
        }).then(this._resCallback.bind(this))
      },
		  pagerItems() {
		    let pagerItems = [];
		    for (let i = 0; i < this.pageCount; i++) {
		      let pageNum = i + 1;
		      pagerItems.push({
            title: pageNum,
            pageNumber: pageNum
          });
        }
        return pagerItems
      },
			updateDynPage(){
				this.loader = true
				let link = this.$route.params.id.toString()
        axios.get(API_GAMES_ENDPOINT, {
          params: {
            expand: API_GAMES_DEFAULT_FIELDS,
            group_id: link
          }
        }).then(this._resCallback.bind(this))
			},
      _resCallback(res) {
        this.currentPage = res.headers['x-pagination-current-page']
        this.pageCount = res.headers['x-pagination-page-count']
        this.gamesArr = res.data
        this.loader = false
      },
		}
	}
</script>