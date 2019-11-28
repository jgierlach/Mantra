import User from '@models/User'

const addContact = async (req, res) => {
  try {
    const user = User.findById(req.user.id)
    user.contacts.push(req.body)
  } catch (err) {
    console.error(err)
  }
}

const displayAllContacts = async (req, res) => {
  try {
    console.log('req.user.id', req.user.id)
    const user = User.findById(req.user.id)
    const contacts = user.contacts
    return res.status(201).json(contacts)
  } catch (err) {
    console.error(err)
  }
}

export default {
  addContact,
  displayAllContacts
}
