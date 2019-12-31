import Vue from 'vue'
import Vuex from 'vuex'
import auth from './auth'
import flash from './flash'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    auth,
    flash
  },
  state: {
    selectedQuote: '',
    contactSendList: []
  },
  actions: {


  },
  mutations: {
    addToContactSendList(state, payload) {
      state.contactSendList.push(payload)
    },
    removeContactFromSendList(state, payload) {
      state.contactSendList.splice(state.contactSendList.findIndex(contact => contact.name === payload.name), 1);
    }
  }
})
