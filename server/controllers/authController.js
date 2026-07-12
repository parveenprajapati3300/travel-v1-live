import jwt from 'jsonwebtoken'
import Admin from '../models/Admin.js'

const generateToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || '7d' })

export const loginAdmin = async (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' })
  }

  const admin = await Admin.findOne({ email })
  if (!admin || !(await admin.matchPassword(password))) {
    return res.status(401).json({ message: 'Invalid admin credentials' })
  }

  res.json({
    token: generateToken(admin._id),
    admin: { id: admin._id, email: admin.email },
  })
}

export const seedAdmin = async (req, res) => {
  const { email, password, setupKey } = req.body

  if (setupKey !== process.env.ADMIN_SETUP_KEY) {
    return res.status(403).json({ message: 'Invalid setup key' })
  }

  const existingAdmin = await Admin.findOne({ email })
  if (existingAdmin) {
    return res.status(409).json({ message: 'Admin already exists' })
  }

  const admin = await Admin.create({ email, password })
  res.status(201).json({ message: 'Admin created', admin: { id: admin._id, email: admin.email } })
}
