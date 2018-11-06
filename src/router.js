import Vue from 'vue'
import VueRouter from 'vue-router'

import WelcomePage from './components/welcome/welcome.vue'
import DashboardPage from './components/dashboard/dashboard.vue'
import SignupPage from './components/auth/signup.vue'
import SigninPage from './components/auth/signin.vue'
import NewCustomer from './components/new/newCustomer.vue'
import Modify from './components/modify/modify.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/', component: WelcomePage },
  { path: '/signup', component: SignupPage },
  { path: '/signin', component: SigninPage },
  { path: '/dashboard', component: DashboardPage,
    beforeEnter(to,from,next){     
      // store.state.idToken
      const userId = localStorage.getItem('userId')
      // const expirationDate = localStorage.getItem('expirationDate')
      const now = new Date()
      if(!userId){
        next('/signin')
      }
      else{
        next()
      }
    }  
},
  { path: '/newCustomer', component: NewCustomer},
  { path: '/modify', component: Modify}
]

export default new VueRouter(
  {
    mode: 'history', 
    routes
  })