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
        firebase.database().ref('entries').push(entry)
        .then(res=>{
            dispatch('initEntries')
        })
        .catch(err=>{
            console.log(err)
            alert(' Failed to add this record!')
        })
        // axios.post('/entries.json'+ "?auth=" +localStorage.getItem('token'), entry)
        // .then((res)=>{
        //     // firebase.database().ref('entries').child('')
        //     // console.log("what is here? ",res)
        //     // commit('SET_ENTRIES',)
        //     dispatch('initEntries')
        // })
        // .catch(err=>console.log(err))
    },
    initEntries({commit,state}){
        //function today() is defined at bottom
        firebase.database().ref('entries').orderByChild('date').equalTo(today()).once('value')
        // firebase.database().ref('entries').once('value')
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
            commit('SET_ENTRIES',entries)
        }) 

        // axios.get('/entries.json')
        // .then((res)=>{
        //     if(res.data){
        //         const entries =[]
        //         for(let key in res.data){
        //             entries.push({
        //                 id:key,
        //                 phone:res.data[key].phone,
        //                 name:res.data[key].name,
        //                 date:res.data[key].date,
        //                 technician:res.data[key].technician,
        //                 type:res.data[key].type,
        //                 comments:res.data[key].comments
        //             })
        //         }
        //         commit('SET_ENTRIES',entries)
        //     }
        //     else{
        //         console.log("no datas")
        //     }
        // })       
    },
    modifyEntry({dispatch},entry){
        const newEntry = {
            mem: entry.mem,
            phone: entry.phone,
            name: entry.name,
            date: entry.date,
            technician: entry.technician,
            type: entry.type,
            comments: entry.comments          
        }
        console.log("entry comments in action of modify: ",entry.comments)
        firebase.database().ref('entries').child(entry.id).update(newEntry)
            .then(res=>{
                // console.log("res from update: ", res)
                dispatch('initEntries')
            })
            .catch(err=>{
                console.log(err)
                alert('Failed to modify this record!')
            })

    },
    deleteEntry({dispatch},entry){
        // firebase.database().ref('entries').child(key).remove();
        firebase.database().ref('entries').child(entry.id).remove()
            .then(()=>{
                dispatch('initEntries')
            })
            .catch(err=>{
                console.log(err)
                alert('Failed to delete this record!')
            })
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
function today() {
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
  }