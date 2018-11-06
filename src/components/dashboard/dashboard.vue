<template>
  <div id="dashboard">
    <div class="search-form">
      <input 
        class="phone-input"
        type="text" 
        placeholder="Phone Number or Date (yyyy-mm-dd)" 
        v-model="target">
      <button @click="searchByPhone" class="search-button">Search</button>
      <br>
      <input 
        class="phone-input"
        type="text" 
        placeholder="Member ID" 
        v-model="mem">
      <button @click="searchByMem" class="search-button">Search ID</button>
    </div>
    <form  class="search-form" @submit.prevent="onSubmit">
      <div class="new" v-if="!entryForm">
        <button @click.prevent="entryForm=!entryForm" v-if="result.length!=0 && searching" style="float:left; margin-left:5px">新记录</button>
        <router-link to="/newCustomer">新客户</router-link>
      </div>
      <div class="new-record" v-if="entryForm">
        <div class="input">
          <label for="mem">Member ID: {{mem}}</label><br>
        </div>
        <div class="input">
          <label for="phone">Phone Number: {{phone}}</label><br>
        </div>
        <div class="input" style="margin-right:auto">
          <label for="age">Customer Name: {{name}}</label><br>
        </div>
        <div class="input" style="margin-right:auto">
          <label for="data">Date:</label><br>
          <input
                  type="date"
                  id="date"
                  v-model="date">
        </div>
        <div class="input">
          <label for="technician">Technician Name:</label>
          <input
                  type="text"
                  id="technician"
                  v-model="technician">
        </div>
        <div class="input">
          <label for="type">Massage Type:</label>
          <select id="type" v-model="type">
            <option value="Body">Body</option>
            <option value="Foot">Foot</option>
            <option value="Combo">Combo</option>
          </select>
        </div>
        <div class="input">
          <label for="comments">Comments:</label>
          <input
                  type="text"
                  id="comments"
                  v-model="comments">
        </div>
        <div class="submit">
          <button type="submit" style="float:right; margin-left:5px">Submit</button>
          <button @click.prevent="entryForm=!entryForm" style="float:right" >cancel</button>
        </div>
      </div>
    </form>
    <div v-if="result.length===0 && searching" class="search-form">
      <h2>No Service Records!</h2>
    </div>
    <div v-if="result.length!=0 && searching" >
      <table class="table table-hover table-striped">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Member ID</th>
            <th scope="col">Phone Number</th>
            <th scope="col">Name</th>
            <th scope="col">Date</th>
            <th scope="col">Technician</th>
            <th scope="col">Type</th>
            <th scope="col">Comments</th>
            <th scope="col">Operations</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(entry,index) in result">
            <th scope="row">{{index+1}}</th>
            <td>{{entry.mem}}</td>
            <td>{{entry.phone}}</td>
            <td>{{entry.name}}</td>
            <td>{{entry.date}}</td>
            <td>{{entry.technician}}</td>
            <td>{{entry.type}}</td>
            <td>{{entry.comments}}</td>
            <td><router-link :to='{path: "/modify", query:{entry: entry}}' type="button" class="btn btn-default">Modify</router-link>
              | <button @click="deleteEntry(entry)" class="btn btn-default">Delete</button></td>
          </tr>
        </tbody>
      </table>
    </div>
    <hr><br>
    <h3 class="col-sm-6 col-sm-offset-2">Service Records for Today:</h3>
    <table class="table table-hover table-striped">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Member ID</th>
          <th scope="col">Phone Number</th>
          <th scope="col">Name</th>
          <th scope="col">Date</th>
          <th scope="col">Technician</th>
          <th scope="col">Type</th>
          <th scope="col">Comments</th>
          <th scope="col">Operations</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(entry,index) in entries">
          <th scope="row">{{index+1}}</th>
          <td>{{entry.mem}}</td>
          <td>{{entry.phone}}</td>
          <td>{{entry.name}}</td>
          <td>{{entry.date}}</td>
          <td>{{entry.technician}}</td>
          <td>{{entry.type}}</td>
          <td>{{entry.comments}}</td>
          <td>
              <router-link :to='{path: "/modify", query:{entry: entry}}' type="button" class="btn btn-default">Modify</router-link>
            | <button @click="deleteEntry(entry)" class="btn btn-default">Delete</button></td>
        </tr>
      </tbody>
    </table>
    
  </div>
</template>
<script>
  import axios from 'axios'
  import * as firebase from 'firebase'
  export default {
    data() {
      return {
        target:'',
        phone:'',
        mem:'',
        name:'',
        date:'',
        technician: '',
        type: 'Body',
        comments: '',
        entryForm:false,
        result: [],
        searching: false,
      }
    },
    computed: {
      today() {
        // https://stackoverflow.com/questions/1531093/how-do-i-get-the-current-date-in-javascript
        let today1 = new Date();
        let dd = today1.getDate();
        let mm = today1.getMonth()+1; //January is 0!
        let yyyy = today1.getFullYear();
        if(dd<10) {
            dd = '0'+dd
        } 
        if(mm<10) {
            mm = '0'+mm
        } 
        const dateOfToday = mm + '/' + dd + '/' + yyyy;
        return dateOfToday
      },
      entries(){
        return this.$store.getters.entries
      }
    },
    methods: {
      onSubmit(){
        // collect form info as an obj and push it back to state management
        const entry = {mem:this.mem.trim(),phone:this.phone.trim(),name:this.name,date:this.date,technician:this.technician,type:this.type,comments:this.comments}
        this.$store.dispatch('addEntry',entry)
        this.mem ='',
        this.phone ='',
        this.name='',
        this.date = '',
        this.technician = '',
        // this.type = '',
        this.comments = '',
        this.entryForm = false,
        this.result = [],
        this.searching = false
      },
      showNewEntry() {
        this.entryForm=!this.entryForm
      },
      searchByMem(){
        this.searching = true
        firebase.database().ref('entries').orderByChild('mem').equalTo(this.mem.trim()).once('value')
        .then(data=>{
            const obj = data.val()
            const entries =[]
            for(let key in obj){
                entries.push({
                    id:key,
                    mem:obj[key].mem,
                    phone:obj[key].phone,
                    name:obj[key].name,
                    date:obj[key].date,
                    technician:obj[key].technician,
                    type:obj[key].type,
                    comments:obj[key].comments
                })
            }
            this.result = entries
        })
      },
      searchByPhone(){
        this.searching = true
        if(this.target.includes('-')){
          // this.searching = false
          firebase.database().ref('entries').orderByChild('date').equalTo(this.target.trim()).once('value')
          .then(data=>{
              const obj = data.val()
              const entries =[]
              for(let key in obj){
                  entries.push({
                      id:key,
                      mem:obj[key].mem,
                      phone:obj[key].phone,
                      name:obj[key].name,
                      date:obj[key].date,
                      technician:obj[key].technician,
                      type:obj[key].type,
                      comments:obj[key].comments
                  })
              }
              this.result = entries
          }) 
        
          //////////////////-----------------------------------------------------------------auth is required!
          // axios.get('/entries.json?orderBy="date"&equalTo="'+this.target.trim()+'"')
          // .then(res=>{
          //   if(res.data){
          //     const results = []
          //     for(let key in res.data){
          //       results.push({
          //           id:key,
          //           phone:res.data[key].phone,
          //           name:res.data[key].name,
          //           date:res.data[key].date,
          //           technician:res.data[key].technician,
          //           type:res.data[key].type,
          //           comments:res.data[key].comments
          //       })
          //     }
          //     this.result = results
          //   }
          //   else{
          //     this.result = []
          //   }
          // })
        }
        else{
          firebase.database().ref('entries').orderByChild('phone').equalTo(this.target.trim()).once('value')
          .then(data=>{
              const obj = data.val()
              if(obj!=null && obj!= undefined){
                this.phone = this.target.trim()
                this.name = obj[Object.keys(obj)[0]].name
              }

              const entries =[]
              for(let key in obj){
                  entries.push({
                      id:key,
                      mem:obj[key].mem,
                      phone:obj[key].phone,
                      name:obj[key].name,
                      date:obj[key].date,
                      technician:obj[key].technician,
                      type:obj[key].type,
                      comments:obj[key].comments
                  })
              }
              this.result = entries
          })           
          // axios.get('/entries.json?orderBy="phone"&equalTo="'+this.target.trim()+'"')
          // .then(res=>{
          //   if(res.data){
          //     this.result=[]
          //       for(let key in res.data){
          //           this.result.push({
          //               id:key,
          //               phone:res.data[key].phone,
          //               name:res.data[key].name,
          //               date:res.data[key].date,
          //               technician:res.data[key].technician,
          //               type:res.data[key].type,
          //               comments:res.data[key].comments
          //           })
          //       }
          //   }
          //   else{
          //     this.result = []
          //   }
          // })         
        }
      },
      deleteEntry(entry){
        if (confirm('Delete this record?')) {
            this.$store.dispatch('deleteEntry',entry)
            //should put below operation in entries.js instead of here
            this.searching = false
        } else {
            return
        }
      }
    },

  }     
</script>

<style scoped>
  .table{
    width:60%;
    margin: 100px auto;   
  }
  .search-form{
    width: 60%;
    margin: 20px auto;
  }
  .search-form .search-area{
    margin: 10px auto;
  }
  .search-form .phone-input{
    width:40%;
    margin: 5px 5px 0;
    padding: 10px;
    font: inherit;
  }
  .search-form .search-button{
    width:100px;
    margin: 5px 5px 0;
    padding: 10px;
    border-radius: 3px;
    background-color: antiquewhite;
    font: inherit;
  }
  /* .search-form .new{
    margin: 0 auto 10px;
  } */

  .search-form .new {
    width: 100%;
    margin: 0 auto 5px;
    text-align: center;
    float: left;
  }

  .search-form .new a {
    margin: 7px;
    text-decoration: none;
    border: 1px solid #521751;
    border-radius: 4px;
    width: 100px;
    padding: 7px;
    color: #5ebdda;
    float: left;
  }

  .search-form .new button {
    margin: 7px;
    text-decoration: none;
    border: 1px solid #521751;
    border-radius: 4px;
    width: 100px;
    padding: 7px;
    color: #5ebdda;
    float: left;
  }

  .search-form .new-record {
    width: 400px;
    margin: 0 auto;
    padding: 5px 0;
    float: left;
  }

  .input {
    margin: 2px auto;
    padding:5px 0;
  }

  .input label {
    display: block;
    color: #4e4e4e;
    margin-bottom: 6px;
    margin-right: 8px;
    float: left;
  }
  .input select {
    display: block;
    color: #4e4e4e;
    margin-bottom: 6px;
    margin-right: 8px;
    font: inherit;
  }
  .input input {
    font: inherit;
    width: 100%;
    padding: 6px 12px;
    box-sizing: border-box;
    border: 1px solid #ccc;
  }

  .submit button {
    border: 1px solid #521751;
    color: #5ebdda;
    padding: 10px 20px;
    font: inherit;
    cursor: pointer;
    border-radius: 4px;
  }

  .submit button:hover,
  .submit button:active {
    background-color: #521751;
    color: white;
  }

  .submit button[disabled],
  .submit button[disabled]:hover,
  .submit button[disabled]:active {
    border: 1px solid #ccc;
    background-color: transparent;
    color: #ccc;
    cursor: not-allowed;
  }
</style>