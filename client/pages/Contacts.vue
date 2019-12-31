<template>
  <div class="container">
    <ContactCard v-for="contact in contactSendList" :key="contact.id" :contact="contact" />
    <div class="border-t-4 border-red-600 rounded mt-4 p-3 px-5"></div>
    <ContactCard v-for="contact in contacts" :key="contact.id" :contact="contact" />
    <div class="border-t-4 border-red-600 rounded mt-4 p-3 px-5"></div>

    <!-- Add A New Contact -->
    <AddNewContact />
  </div>
</template>

<script>
import axios from 'axios'
import ContactCard from '../components/ContactCard.vue'
import AddNewContact from '../components/AddNewContact.vue'

export default {
  async mounted() {
    try {
      const { token } = JSON.parse(localStorage.getItem('auth'))
      const response = await axios.get('/api/v1/contacts', {
        headers: {
          access_token: token
        }
      })
      this.contacts = response.data
    } catch (err) {
      console.error(err)
    }
  },
  data() {
    return {
      contacts: []
    }
  },
  computed: {
    contactSendList() {
      return this.$store.state.contactSendList
    }
  },
  components: {
    ContactCard,
    AddNewContact
  }
}
</script>