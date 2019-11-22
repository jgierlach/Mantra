import mongoose from 'mongoose'

const ContactsSchema = new mongoose.Schema({
  name: String,
  phoneNumber: String
})

export default mongoose.model('Contacts', ContactsSchema)
