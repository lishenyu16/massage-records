import data_entries from '../data/data-entries'
import axios from "axios"
import * as firebase from 'firebase'

const state = {
    entries:[],
    entry:{}
}

const mutations = {
    SET_ENTRIES(state,payload){
        state.entries = payload
    },
}

const actions = {
    addEntry({dispatch,state},entry){
        axios.post('/entries.json'+ "?auth=" +localStorage.getItem('token'), entry)
        .then((res)=>{
            // firebase.database().ref('entries').child('')
            // console.log("what is here? ",res)
            // commit('SET_ENTRIES',)
            dispatch('initEntries')
        })
        .catch(err=>console.log(err))
    },
    initEntries({commit,state}){       
        axios.get('/entries.json')
        .then((res)=>{
            if(res.data){
                const entries =[]
                for(let key in res.data){
                    entries.push({
                        id:key,
                        phone:res.data[key].phone,
                        name:res.data[key].name,
                        date:res.data[key].date,
                        technician:res.data[key].technician,
                        type:res.data[key].type,
                        comments:res.data[key].comments
                    })
                }
                commit('SET_ENTRIES',entries)
            }
            else{
                console.log("no datas")
            }
        })       
    },
    modifyEntry({dispatch},entry){
        const newEntry = {
            phone: entry.phone,
            name: entry.name,
            date: entry.date,
            technician: entry.technician,
            type: entry.type,
            comments: entry.comments          
        }
        console.log("entryid: ",entry.id)
        firebase.database().ref('entries').child(entry.id).update(newEntry)
            .then(res=>{
                console.log("res from update: ", res)
                dispatch('initEntries')
            })
            .catch(err=>{
                console.log(err)
                alert('Operation failed!')
            })

    },
    deleteEntry({dispatch},entry){
        // firebase.database().ref('entries').child(key).remove();
        firebase.database().ref('entries').child(entry.id).remove()
            .then(()=>{
                dispatch('initEntries')
            })
            .catch(err=>console.log(err))
    },
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