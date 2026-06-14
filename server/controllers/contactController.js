import Contact from '../models/Contact.js'

export const createContact = async (req, res) => {
  const contact = await Contact.create({
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    subject: req.body.subject,
    message: req.body.message,
  })

  res.status(201).json({ message: 'Message submitted successfully', contact })
}

export const getContacts = async (req, res) => {
  const contacts = await Contact.find().sort({ createdAt: -1 })
  res.json(contacts)
}

export const deleteContact = async (req, res) => {
  const contact = await Contact.findById(req.params.id)

  if (!contact) {
    return res.status(404).json({ message: 'Contact message not found' })
  }

  await contact.deleteOne()
  res.json({ message: 'Contact message deleted' })
}
