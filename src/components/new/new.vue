<template>
  <div id="new">
    <div class="new-form">
      <form @submit.prevent="onSubmit">
        <div class="input">
          <label for="phone">Phone Number</label>
          <input
                  type="number"
                  id="phone"
                  v-model="phone">
        </div>
        <div class="input">
          <label for="age">Customer Name</label>
          <input
                  type="text"
                  id="name"
                  @blur="$v.name.$touch()"
                  v-model="name">
        </div>
        <div class="input">
          <label for="data">Date</label><span>{{today}}</span>

        </div>
        <div class="input">
          <label for="technician">Technician Name</label>
          <input
                  type="text"
                  id="technician"
                  v-model="technician">
        </div>
        <div class="input">
          <label for="type">Massage Type</label>
          <select id="type" v-model="type">
            <option value="Body">Body</option>
            <option value="Foot">Foot</option>
            <option value="Combo">Combo</option>
          </select>
        </div>
        <div class="input">
          <label for="comments">Comments</label>
          <input
                  type="text"
                  id="comments"
                  v-model="comments">
        </div>
        <div class="submit">
          <button type="submit">Submit</button>
          <button @click="$router.push('/dashboard')">Cancel</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  // import { required, email, numeric, minValue} from 'vuelidate/lib/validators'
  export default {
    data () {
      return {
        name: '',
        phone: null,
        date:'',
        technician: '',
        type: 'Body',
        comments: ''
      }
    },
    methods: {
      onSubmit () {
        const formData = {
          name: this.name,
          phone: this.phone,
          date: this.date,
          technician: this.technician,
          type: this.type,
          // hobbies: this.hobbyInputs.map(hobby => hobby.value),
          comments: this.comments
        }
        console.log(formData)
        // this.$store.dispatch('signup',formData)
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
      unmatch() {
        return this.password!=this.confirmPassword 
      },
      signed_up(){
        return this.$store.getters.signed_up
      }
    },
  }
</script>

<style scoped>
  .input .alert{
    border: 2px solid red;
  }
  #new{
    text-align: center;
    padding-top: 40px;
    color:rgb(0, 255, 255);
  }
  .new-form {
    width: 400px;
    margin: 30px auto;
    border: 1px solid #eee;
    padding: 20px;
    box-shadow: 0 2px 3px #ccc;
  }

  .input {
    margin: 10px auto;
  }

  .input label {
    display: block;
    color: #4e4e4e;
    margin-bottom: 6px;
    margin-right: 6px;
    float: left;
  }

  .input.inline label {
    display: inline;
  }

  .input input {
    font: inherit;
    width: 100%;
    padding: 6px 12px;
    box-sizing: border-box;
    border: 1px solid #ccc;
  }

  .input.inline input {
    width: auto;
  }

  .input.invalid label{
    color: red;
  }

  .input.invalid input{
    border: 1px solid red;
    background-color: rgb(226, 199, 162);
  }

  .input input:focus {
    outline: none;
    border: 1px solid #521751;
    background-color: #eee;
  }

  .input select {
    display: block;
    color: #4e4e4e;
    margin: auto 6px 6px;
    font: inherit;
  }

  .submit button {
    border: 1px solid #521751;
    color: #521751;
    padding: 10px 20px;
    font: inherit;
    cursor: pointer;
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