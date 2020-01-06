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
    selectedQuoteText: 'How will you inspire your friends today?',
    selectedQuoteAuthor: '',
    contacts: [],
    contactSendList: [],
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
      await axios.post('/api/v1/contacts/add', { 'contactId': contactId }, {
        headers: {
          access_token: token
        }
      })
      dispatch('fetchContacts')
    },
    async fetchContacts({ state }) {
      try {
        const { token } = JSON.parse(localStorage.getItem('auth'))
        const response = await axios.get('/api/v1/contacts', {
          headers: {
            access_token: token
          }
        })
        state.contacts = response.data
      } catch (err) {
        console.error(err)
      }
    },
    async deleteContact({ dispatch, commit }, contact) {
      const { token } = JSON.parse(localStorage.getItem('auth'))
      await axios.post('/api/v1/contacts/delete', { 'contactId': contact._id }, {
        headers: {
          access_token: token
        }
      })
      commit('removeContactFromSendList', contact)
      dispatch('fetchContacts')
    },
    updateSelectedQuoteTextAndAuthor({ commit }, quote) {
      commit("updateSelectedQuoteText", quote)
      commit("updateSelectedQuoteAuthor", quote)
    },
    async sendQuoteToContacts() {
      const { token } = JSON.parse(localStorage.getItem('auth'))
      await axios.post('/api/v1/quotes/send', { to: '+2246450847', from: '+18632690689', body: 'This is a test' }, {
        headers: {
          access_token: token
        }
      })
    }
  },
  mutations: {
    addToContactSendList(state, payload) {
      state.contactSendList.push(payload)
    },
    removeContactFromSendList(state, payload) {
      state.contactSendList.splice(state.contactSendList.findIndex(contact => contact.name === payload.name), 1);
    },
    updateSelectedQuoteText(state, quote) {
      state.selectedQuoteText = quote.quote
    },
    updateSelectedQuoteAuthor(state, quote) {
      state.selectedQuoteAuthor = quote.author
    }
  }
})
