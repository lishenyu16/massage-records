<template>
  <div id="dashboard">
    <form  class="search-form" @submit.prevent="onSubmit">
      <div class="search-area">
        <input 
          class="phone-input"
          type="text" 
          placeholder="Phone Number" 
          v-model="phone">
        <button @click="searchByPhone" class="search-button">Search</button>
      </div>
      <div class="new" v-if="!entryForm">
        <button @click.prevent="entryForm=!entryForm" v-if="result.length!=0 && searching" style="float:left; margin-left:5px">新记录</button>
        <router-link to="/new">新客户</router-link>
      </div>
      <div class="new-record" v-if="entryForm">
        <div class="input">
          <label for="phone">Phone Number: {{phone}}</label><br>
        </div>
        <div class="input" style="margin-right:auto">
          <label for="age">Customer Name: {{name}}</label><br>
        </div>
        <div class="input" style="margin-right:auto">
          <label for="data">Date: {{today}}</label><br>
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
      <h1>No Service Records!</h1>
    </div>
    <div v-if="result.length!=0 && searching" >
      <table class="table table-hover table-striped">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Phone Number</th>
            <th scope="col">Name</th>
            <th scope="col">Date</th>
            <th scope="col">Technician</th>
            <th scope="col">Type</th>
            <th scope="col">Comments</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(entry,index) in result">
            <th scope="row">{{index}}</th>
            <td>{{entry.phone}}</td>
            <td>{{entry.name}}</td>
            <td>{{entry.date}}</td>
            <td>{{entry.technician}}</td>
            <td>{{entry.type}}</td>
            <td>{{entry.comments}}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <hr>
    <table class="table table-hover table-striped">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Phone Number</th>
          <th scope="col">Name</th>
          <th scope="col">Date</th>
          <th scope="col">Technician</th>
          <th scope="col">Type</th>
          <th scope="col">Comments</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(entry,index) in entries">
          <th scope="row">{{index}}</th>
          <td>{{entry.phone}}</td>
          <td>{{entry.name}}</td>
          <td>{{entry.date}}</td>
          <td>{{entry.technician}}</td>
          <td>{{entry.type}}</td>
          <td>{{entry.comments}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
  import axios from 'axios'
  export default {
    data() {
      return {
        phone:'',
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
      },
      showNewEntry() {
        this.entryForm=!this.entryForm
      },
      searchByPhone(){
        this.result = []
        this.searching = true
        const entries = this.$store.getters.entries
        const record = entries.find(element=>element.phone == this.phone)
        if(record){
          //Phone, name, date pre-filled
          this.name = record.name
          this.date = this.today
          for(let i=0;i<=entries.length;i++){
            if(entries[i].phone == this.phone){
              this.result.push(entries[i])
            }
          }
          const result = entries.map(element=>{
            if(element.phone== this.phone){
              result.push(element)
            }
          })
          //.....
        }
        else{
          this.result = []
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
  .search-form .search-area .phone-input{
    width:40%;
    margin: 5px 5px 0;
    padding: 10px;
    font: inherit;
  }
  .search-form .search-area .search-button{
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