import Vue from 'vue'
import Vuex from 'vuex'
import auth from './auth'
import flash from './flash'
import axios from 'axios'

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
    async newContact({ state, dispatch }, contact) {
      const { token } = JSON.parse(localStorage.getItem('auth'))
      const response = await axios.post('/api/v1/contacts/new', contact, {
        headers: {
          access_token: token
        }
      })
      const contactId = response.data._id
      console.log('contactId', contactId)
      await axios.post('/api/v1/contacts/add', {'contactId': contactId}, {
        headers: {
          access_token: token
        }
      })
    },
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
