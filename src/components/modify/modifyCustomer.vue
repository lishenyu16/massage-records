<template>
<div class="container">
    <form class="form">
        <div class="form-group row">
            <label class="col-sm-1 col-sm-offset-4 col-form-label">Member ID:</label>
            <div class="col-sm-3">
                <input type="text" class="form-control" v-model.lazy="mem">
            </div>
        </div>
        <div class="form-group row">
            <label class="col-sm-1 col-sm-offset-4 col-form-label">Phone:</label>
            <div class="col-sm-3">
                <input type="text" class="form-control" v-model.lazy="phone">
            </div>
        </div>
        <div class="form-group row">
            <label  class="col-sm-1 col-sm-offset-4 col-form-label">Name:</label>
            <div class="col-sm-3">
                <input type="text" class="form-control"  v-model.lazy="name">
            </div>
        </div>
    </form>
    <div class="form-group row">
        <div class="col-sm-2 col-sm-offset-6">
            <div style="float:right">
                <button type="cancel" class="btn btn-primary" @click="cancel">Cancel</button>  
                <button type="submit" class="btn btn-primary" @click="submit">Submit</button> 
            </div> 
        </div>        
    </div>
</div>

</template>

<script>
    export default {
        data() {
            return {
                id: this.$route.query.customer.id,
                mem: this.$route.query.customer.mem,
                phone: this.$route.query.customer.phone,
                name: this.$route.query.customer.name
            }
        },
        methods: {
            submit() {
                const entry = { 
                    id:this.id,
                    mem:this.mem,
                    phone:this.phone,
                    name:this.name
                }
                this.$store.dispatch('modifyCustomer',entry)
                .then(()=>{
                    alert('Customer Info has been updated!')
                    this.$router.replace('/dashboard')
                })
                .catch(err=>{
                    alert('Operation failed!')
                })
            },
            cancel(){
                this.$router.replace('/dashboard')
            }
        },
    }
</script>

<style>
    .form {
       padding-top: 5%; 
    }
</style>
