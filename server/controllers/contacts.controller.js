import User from '@models/User'

const addContact = async (req, res) => {
  const { name, phoneNumber } = req.body

  const contact = await User.contacts.create({
    name,
    phoneNumber
  })
}
