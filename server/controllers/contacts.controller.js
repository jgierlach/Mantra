import User from '@models/User'
import Contact from '@models/Contact'

const newContact = async (req, res) => {
  try {
    const { name, phoneNumber } = req.body
    if (!name) {
      throw new Error("name is required")
    }
    if (!phoneNumber) {
      throw new Error("phone number is required")
    }
    const contact = await Contact.create({ name, phoneNumber })
    return res.json(contact)
  } catch (err) {
    console.error(err)
  }
}

const addContact = async (req, res) => {
  // assumptinos
  // 1. the user doc exists
  // 2. the contact doc exists

  try {
    const id = req.user.id
    const update = { $addToSet: { contacts: [req.body.contactId] } }
    const options = { new: true }
    const updatedUser = await User.findByIdAndUpdate(id, update, options)
    return res.json(updatedUser)
  } catch (err) {
    console.error(err)
  }
}

const displayAllContacts = async (req, res) => {
  try {
    console.log('req.headers', req.headers)
    const user = await User.findById(req.user.id).populate('contacts')
    const contacts = user.contacts
    return res.status(201).json(contacts)
  } catch (err) {
    console.error(err)
  }
}

export default {
  addContact,
  displayAllContacts,
  newContact
}
