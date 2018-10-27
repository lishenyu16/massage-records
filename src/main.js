import Vue from 'vue'
import App from './App.vue'
import axios from "axios"
import router from './router'
import store from './store'
import Vuelidate from 'vuelidate'

Vue.use(Vuelidate)
axios.defaults.baseURL = 'https://massage-ff04d.firebaseio.com/'

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
