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
                      <div id="pick-avatar" class="edit-btn"></div>
                      <avatar-cropper
                          :upload-handler="avatarUploadHandler"
                          trigger="#pick-avatar"
                          :labels="avatarUploaderLabels"
                      />

                      <h4>{{ $t('pages.account.profile.editAvatar') }}</h4>
                      <div class="text-center">


                      </div>
                    </div>
                    <!-- <input type="file" ref="file" @change="changeAvatar"> -->

                  </div>
                </div>
                <div class="col-lg-6">
                  <div class="small-depo-box">
                    <div class="small-depo-box-in">
                      <router-link tag="div" to="/cash-withdrawal" class="minusik"></router-link>
                      <h4>{{ getCurrentAccount.amount_as_currency }}</h4>
                      <router-link tag="div" to="/deposit" class="plusik"></router-link>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-lg-6">
                <label for="profile-nickname">{{ $t('pages.account.profile.nickname') }}</label>
                <input id="profile-nickname" type="text" :value="player.nickname" @input="updateField($event)"
                       data-field="nickname">
              </div>
              <div class="col-lg-6">
                <label for="profile-email">{{ $t('pages.account.profile.email') }}</label>
                <input id="profile-email" type="text" :value="player.email" @input="updateField($event)"
                       data-field="email">
              </div>
              <div class="col-lg-6">
                <label for="profile-login">{{ $t('pages.account.profile.login') }}</label>
                <input id="profile-login" type="text" :value="player.username" @input="updateField($event)"
                       data-field="username">
              </div>
              <div class="col-lg-6">
                <label for="profile-name">{{ $t('pages.account.profile.name') }}</label>
                <input id="profile-name" type="text" :value="player.name" @input="updateField($event)"
                       data-field="name">
              </div>
              <div class="col-lg-6">
                <label for="profile-last-name">{{ $t('pages.account.profile.lastName') }}</label>
                <input id="profile-last-name" type="text" :value="player.surname" @input="updateField($event)"
                       data-field="surname">
              </div>

              <div class="col-lg-6">
                <label for="profile-sex">{{ $t('pages.account.profile.sex') }}</label>
                <select name="" id="profile-sex" v-model="player.gender" @input="updateField($event)"
                        data-field="gender">
                  <option value="null"></option>
                  <option value="male">{{ $t('pages.account.profile.male') }}</option>
                  <option value="female">{{ $t('pages.account.profile.female') }}</option>
                </select>
              </div>
              <div class="col-lg-6">
                <label for="profile-birthday">{{ $t('pages.account.profile.birthday') }}</label>
                <input id="profile-birthday" type="date" :value="player.birthdate" @input="updateField($event)"
                       data-field="birthdate">
              </div>
              <div class="col-lg-6">
                <label for="profile-country">{{ $t('pages.account.profile.country') }}</label>
                <select id="profile-country" name="" v-model="player.country_id" @input="updateField($event)"
                        data-field="country_id">
                  <option value=""></option>
                  <option :value="count.id" v-for="count in countries">{{ count.name }}</option>
                </select>
              </div>
              <div class="col-lg-6">
                <label for="profile-address">{{ $t('pages.account.profile.address') }}</label>
                <input id="profile-address" type="text" :value="player.address" @input="updateField($event)"
                       data-field="address">
              </div>
              <div class="col-lg-6">
                <label for="profile-city">{{ $t('pages.account.profile.city') }}</label>
                <input id="profile-city" type="text" :value="player.city" @input="updateField($event)"
                       data-field="city">
              </div>
              <div class="col-lg-6">
                <label for="profile-timezone">{{ $t('pages.account.profile.timezone') }}</label>

                <select id="profile-timezone" name="" v-model="player.timezone_id" @input="updateField($event)"
                        data-field="timezone_id">
                  <option value=""></option>
                  <option :value="tmz.id" v-for="tmz in timezones">{{ tmz.name }}</option>
                </select>
              </div>
              <div class="col-lg-12">
                <div class="errors" v-for="(er, index) in errors ">
                  <p style="color: red;">{{ index + 1 }}. {{ er.message }}</p>
                </div>

                <div v-if="isLoading">
                  <button class="save-btn"><img src="../../assets/img/icons/nv6.svg" class="spin"></button>
                </div>
                <div v-else>
                  <button class="save-btn" @click="updateUser">{{
                      $t('pages.account.profile.saveButtonTitle')
                    }}
                  </button>
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
import AvatarCropper from "vue-avatar-cropper"
import {mapGetters} from 'vuex'
import {API} from "../../api";

export default {
  components: {Navbar, AcNav, AvatarCropper},
  computed: {
    ...mapGetters({
      player: "auth/getPlayer",
      timezones: "auth/getZones",
      countries: "auth/getCountries",
      lang: "auth/getLang"
    }),
    getCurrentAccount() {
      if (this.player) {
        return this.player.accounts.find(item => {
          return item.is_current == true
        })
      }
    },
  },
  watch: {
    lang() {
      this.$store.dispatch('auth/loadTimezones')
      this.$store.dispatch('auth/loadCountries')
    },
  },
  created() {
    this.$store.dispatch('auth/loadTimezones')
    this.$store.dispatch('auth/loadCountries')
  },
  data() {
    return {
      isLoading: false,
      file: null,
      inpArr: [],
      errors: null,
      avatarUploaderLabels: {
        submit: 'ok',
        cancel: 'cancel'
      }
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
        this.$store.dispatch('auth/CHANGE_FIELD', payload)
        return
      }

      this.inpArr.push({name: attr, value: e.target.value})
      this.$store.dispatch('auth/CHANGE_FIELD', payload)

    },
    updateUser() {

      this.isLoading = true
      this.errors = null


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


      API.patch('players/' + this.player.id, objField)
          .then(response => {
            this.$store.dispatch('auth/getUser')
            this.isLoading = false
            this.$toasted.show(this.$t('pages.account.profile.profileEditSuccess'), {
              duration: 1500
            })
          })
          .catch(err => {
            this.errors = err.response.data
            this.isLoading = false
            this.$toasted.show(this.$t('pages.account.profile.profileEditFail'), {
              duration: 1500
            })
          })

    },
    avatarUploadHandler(cropper) {
      cropper.getCroppedCanvas().toBlob(function (blob) {
        let formData = new FormData();
        formData.append('image', blob, 'avatar.png')
        API.post('player-avatars', formData,
            {
              headers: {"Content-Type": "multipart/form-data"}
            }
        ).then(response => {
          this.player.avatars[0].url = response.data.url;
          this.$toasted.show(this.$t('pages.account.profile.avatarUploadedSuccess'), {
            duration: 1500
          })
        }).catch(error => {
          this.$toasted.show(this.$t('pages.account.profile.avatarUploadedFailed'), {
            duration: 1500
          })
        })
      }.bind(this), 'image/png');

    }
  }
}
</script>