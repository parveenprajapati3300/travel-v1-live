import Inquiry from '../models/Inquiry.js'

export const createInquiry = async (req, res) => {
  const inquiry = await Inquiry.create({
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    destination: req.body.destination,
    travelDate: req.body.travelDate,
    people: req.body.people,
    budget: req.body.budget,
    message: req.body.message,
  })

  res.status(201).json({ message: 'Inquiry submitted successfully', inquiry })
}

export const getInquiries = async (req, res) => {
  const inquiries = await Inquiry.find().sort({ createdAt: -1 })
  res.json(inquiries)
}

export const markInquiryContacted = async (req, res) => {
  const inquiry = await Inquiry.findById(req.params.id)

  if (!inquiry) {
    return res.status(404).json({ message: 'Inquiry not found' })
  }

  inquiry.status = 'Contacted'
  await inquiry.save()
  res.json({ message: 'Inquiry marked as contacted', inquiry })
}

export const deleteInquiry = async (req, res) => {
  const inquiry = await Inquiry.findById(req.params.id)

  if (!inquiry) {
    return res.status(404).json({ message: 'Inquiry not found' })
  }

  await inquiry.deleteOne()
  res.json({ message: 'Inquiry deleted' })
}
