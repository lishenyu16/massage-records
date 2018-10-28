import data_entries from '../data/data-entries'

const state = {
    entries:[],
    entry:{}
}

const mutations = {
    setEntries(state,datas){
        state.entries = datas
    }
}

const actions = {
    initEntries({commit,state}){
        commit('setEntries',data_entries)
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