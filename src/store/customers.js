const state = {
    customers:[],
    customer:{}
}

const mutations = {
    ADD_CUSTOMER(state,customer){
        
    }
}

const actions = {
    addCustomer({commit,dispatch},customer){
        console.log("this is a new customer to be added: ", customer)
        dispatch('addEntry',customer)
    }
}

const getters = {
    
}

export default {
    state,
    mutations,
    actions,
    getters
}