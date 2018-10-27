<template>
  <div id="dashboard">
    <form  class="search-form">
      <div class="search-area">
        <input 
          class="phone-input"
          type="number" 
          placeholder="Phone Number" 
          v-model="phone">
        <button @click="searchByPhone" class="search-button">Search</button>
      </div>
      <div class="new" v-if="!entryForm">
        <button @click.prevent="entryForm=!entryForm"  style="float:left; margin-left:5px">New Entry</button>
        <router-link to="/new">New User</router-link>
      </div>
      <div class="new-record" v-if="entryForm">
        <div class="input">
          <label for="phone">Phone Number:</label><span>6264668502</span>
        </div>
        <div class="input">
          <label for="age">Customer Name:</label><span>Lily</span>
        </div>
        <div class="input">
          <label for="data">Date:</label><span>{{today}}</span>
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
    <table class="table table-hover table-striped">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">First</th>
          <th scope="col">Last</th>
          <th scope="col">Handle</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row">1</th>
          <td>Mark</td>
          <td>Otto</td>
          <td>@mdo</td>
        </tr>
        <tr>
          <th scope="row">2</th>
          <td>Jacob</td>
          <td>Thornton</td>
          <td>@fat</td>
        </tr>
        <tr>
          <th scope="row">3</th>
          <td colspan="2">Larry the Bird</td>
          <td>@twitter</td>
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
        entries: [
          {phone:6264668502,name:'jim',date:'10/23/2018',technician:'lili',type:'body',comments:''},
          {phone:6264668502,name:'jim',date:'10/21/2018',technician:'lili',type:'combo',comments:''},
          {phone:6264668502,name:'jim',date:'10/19/2018',technician:'nono',type:'foot',comments:''},
          {phone:1111111,name:'mike',date:'10/22/2018',technician:'haha',type:'combo',comments:''},
          {phone:222222,name:'kevin',date:'10/21/2018',technician:'nono',type:'body',comments:''},
          {phone:3333333,name:'james',date:'10/20/2018',technician:'haha',type:'combo',comments:''},
          {phone:444444,name:'selina',date:'10/25/2018',technician:'nono',type:'foot',comments:''}
        ]
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
    },
    methods: {
      onSubmit(){

      },
      showNewEntry() {
        this.entryForm=!this.entryForm
        console.log(this.entryForm)
      },
      searchByPhone(){

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
    color: #521751;
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