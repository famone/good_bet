<template>
  <div>
    <Navbar/>

    <section id="account" v-if="player">
      <div class="container">
        <div class="row">
          <AcNav/>
          <div class="col-lg-9">
            <div class="row">
              <div class="row ma-0">
                <div class="col-lg-6">
                  <div class="ava-edit">
                    <div class="ava-box-edit">
                      <div class="avatar" v-if="player.avatars.length !== 0"
                           :style="{'background-image': 'url(' + player.avatars[0].url + ')'}"></div>
                      <div class="avatar" v-else>
                        <span>{{ player.nickname.substr(0, 1) }}</span>
                      </div>
                      <h4>Edit avatar</h4>
                    </div>
                    <!-- <input type="file" ref="file" @change="changeAvatar"> -->
                    <div class="edit-btn"></div>
                  </div>
                </div>
              </div>
              <div class="col-lg-6">
                <label for="">Nickname</label>
                <input type="text" :value="player.nickname" @input="updateField($event)" data-field="nickname">
              </div>
              <div class="col-lg-6">
                <label for="">E-mail</label>
                <input type="text" :value="player.email" @input="updateField($event)" data-field="email">
              </div>
              <div class="col-lg-6">
                <label for="">Login</label>
                <input type="text" :value="player.username" @input="updateField($event)" data-field="username">
              </div>
              <div class="col-lg-6">
                <label for="">Name</label>
                <input type="text" :value="player.name" @input="updateField($event)" data-field="name">
              </div>
              <div class="col-lg-6">
                <label for="">Last name</label>
                <input type="text" :value="player.surname" @input="updateField($event)" data-field="surname">
              </div>

              <div class="col-lg-6">
                <label for="">Sex</label>
                <select name="" id="" v-model="player.gender" @input="updateField($event)" data-field="gender">
                  <option value="null"></option>
                  <option value="male">male</option>
                  <option value="female">female</option>
                </select>
              </div>
              <div class="col-lg-6">
                <label for="">Birthday</label>
                <input type="date" :value="player.birthdate" @input="updateField($event)"
                       data-field="birthdate">
              </div>
              <div class="col-lg-6">
                <label for="">Country</label>
                <select name="" id="" v-model="player.country_id" @input="updateField($event)" data-field="country_id">
                  <option value=""></option>
                  <option :value="count.id" v-for="count in countries">{{ count.name }}</option>
                </select>
              </div>
              <div class="col-lg-6">
                <label for="">Address</label>
                <input type="text" :value="player.address" @input="updateField($event)" data-field="address">
              </div>
              <div class="col-lg-6">
                <label for="">City</label>
                <input type="text" :value="player.city" @input="updateField($event)" data-field="city">
              </div>
              <div class="col-lg-6">
                <label for="">Timezone {{ player.timezone_id }}</label>

                <select name="" v-model="player.timezone_id" @input="updateField($event)" data-field="timezone_id">
                  <option value=""></option>
                  <option :value="tmz.id" v-for="tmz in timezones">{{ tmz.name }}</option>
                </select>
              </div>
              <div class="col-lg-12">
                <button class="save-btn" @click="updateUser">SAVE</button>
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
import {mapGetters} from 'vuex'
import axios from 'axios'
import {API} from "../../api";

export default {
  components: {Navbar, AcNav},
  computed: {
    ...mapGetters({
      player: "auth/getPlayer",
      timezones: "auth/getZones",
      countries: "auth/getCountries"
    }),
  },
  created() {
    this.$store.dispatch('auth/loadTimezones')
    this.$store.dispatch('auth/loadCountries')
  },
  data() {
    return {
      file: null,
      inpArr: []
    }
  },
  methods: {
    updateField(e) {

      let attr = e.target.getAttribute('data-field')
      let payload = {name: attr, value: e.target.value}
      let fieldInArr = this.inpArr.find(item => {
        return item.name === attr
      })

      if (fieldInArr) {
        fieldInArr.value = e.target.value
        console.log(payload)
        this.$store.dispatch('auth/CHANGE_FIELD', payload)
        return
      }

      this.inpArr.push({name: attr, value: e.target.value})
      // console.log(payload)
      this.$store.dispatch('auth/CHANGE_FIELD', payload)

    },
    updateUser() {


      let objField = {
        form: {
          id: this.player.id,
          fields: [
            {
              inputs: this.inpArr
            }
          ]
        }
      }

      console.log(this.inpArr)


      API.patch('players/' + this.player.id, objField)
          .then(response => {
            console.log(response)

            this.$store.dispatch('auth/getUser')
          })
          .catch(function () {
            console.log('FAILURE!!');
          });

    }
    // changeAvatar(){
    // 	 this.file = this.$refs.file.files[0];

    // 	 console.log(this.file)


    // 	 let formData = new FormData();

    // 	 formData.append('file', this.file);
    // 	 let userToken = JSON.parse(localStorage.getItem('userToken'));

    // 	 axios
    // 	 .patch( 'http://api.casinoplatform.site/v3/player-avatars/117', formData,{headers: {'Content-Type': 'multipart/form-data', 'Authorization': 'Bearer ' + userToken.userToken }})
    // 	 .then(response =>{
    // 	 	console.log(response)
    // 	 })
    //        .catch(function(){
    //          console.log('FAILURE!!');
    //        });
    // }
  }
}
</script>