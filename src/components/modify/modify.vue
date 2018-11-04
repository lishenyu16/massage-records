<template>
<div class="container">
    <form class="form">
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
        <div class="form-group row">
            <label  class="col-sm-1 col-sm-offset-4 col-form-label">Date:</label>
            <div class="col-sm-3">
                <input type="text" class="form-control" disabled v-model.lazy="date">
            </div>
        </div>
        <div class="form-group row">
            <label class="col-sm-1 col-sm-offset-4 col-form-label">Technician:</label>
            <div class="col-sm-3">
                <input type="text" class="form-control"  v-model.lazy="technician">
            </div>
        </div>
        <div class="form-group row">
            <label class="col-sm-1 col-sm-offset-4 col-form-label">Type:</label>
            <div class="col-sm-3">
                <select class="form-control" v-model="type">
                    <option value="Body">Body</option>
                    <option value="Foot">Foot</option>
                    <option value="Combo">Combo</option>
                </select>
            </div>
        </div>
        <div class="form-group row">
            <label class="col-sm-1 col-sm-offset-4 col-form-label">Comments:</label>
            <div class="col-sm-3">
                <textarea class="form-control" rows="3"></textarea>
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
                id: this.$route.query.entry.id,
                phone: this.$route.query.entry.phone,
                name: this.$route.query.entry.name,
                date: this.$route.query.entry.date,
                technician: this.$route.query.entry.technician,
                type: this.$route.query.entry.type,
                comments: this.$route.query.entry.comments,
            }
        },
        methods: {
            submit() {
                const entry = { 
                    id:this.id,
                    phone:this.phone,
                    name:this.name,
                    date:this.date,
                    technician:this.technician,
                    type:this.type,
                    comments:this.comments
                }
                this.$store.dispatch('modifyEntry',entry)
                .then(()=>{
                    this.$router.replace('/dashboard')
                })
                .catch(err=>{
                    alert('Operation failed!')
                })
            },
            cancel(){

            }
        },
    }
</script>

<style>
    .form {
       padding-top: 5%; 
    }
</style>
