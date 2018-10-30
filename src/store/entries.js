import data_entries from '../data/data-entries'
import axios from "axios"

const state = {
    entries:[],
    entry:{}
}

const mutations = {
    SET_ENTRIES(state){
        // state.entries = datas
        axios.get('/entries.json')
        .then((res)=>{
            if(res.data){
                // console.log(res.data)
                state.entries = []
                for(let key in res.data){
                    state.entries.push(res.data[key])
                }

                console.log(state.entries)
            }
            else{
                console.log("no datas")
            }
        })
    },
    // ADD_ENTRY(state,commit,entry){
    //     console.log("this is an entry to be added: ",entry)
    //     axios.post('/entries.json',entry)
    //     .then((res)=>{
    //         console.log(res)
    //         commit('SET_ENTRIES')
    //     })
    //     .catch(err=>console.log(err))
    //     // state.entries.push(entry)
    // }
}

const actions = {
    addEntry({commit,state},entry){
        // console.log("this is an entry to be added: ",entry)
        axios.post('/entries.json',entry)
        .then((res)=>{
            console.log(res)
            commit('SET_ENTRIES')
        })
        .catch(err=>console.log(err))
    },
    initEntries({commit,state}){
        commit('SET_ENTRIES')
    }
}

const getters = {
    entries(){
        return state.entries
    }
}

export default {
    state,
    mutations,
    actions,
    getters
}