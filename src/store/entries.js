import data_entries from '../data/data-entries'

const state = {
    entries:[],
    entry:{}
}

const mutations = {
    SET_ENTRIES(state,datas){
        state.entries = datas
    },
    ADD_ENTRY(state,entry){
        state.entries.push(entry)
    }
}

const actions = {
    addEntry({commit,state},entry){
        commit('ADD_ENTRY',entry)
    },
    initEntries({commit,state}){
        commit('SET_ENTRIES',data_entries)
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