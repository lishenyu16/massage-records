import Vue from 'vue'
import App from './App.vue'
import axios from "axios"
import router from './router'
import store from './store'
import Vuelidate from 'vuelidate'
import * as firebase from 'firebase'

Vue.use(Vuelidate)
axios.defaults.baseURL = 'https://massage-ff04d.firebaseio.com/'

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
  created(){
    firebase.initializeApp({
      apiKey: "AIzaSyBRK6L8FD0IoTq43KLZ3e2QrKxEBEwoU_A",
      authDomain: "massage-ff04d.firebaseapp.com",
      databaseURL: "https://massage-ff04d.firebaseio.com",
      projectId: "massage-ff04d",
      storageBucket: "massage-ff04d.appspot.com",
      messagingSenderId: "989643851654"
    })
  }
})
