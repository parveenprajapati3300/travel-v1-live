import Admin from '../models/Admin.js'

const seedDefaultAdmin = async () => {
  const email = process.env.DEFAULT_ADMIN_EMAIL || 'admin@tripnest.in'
  const password = process.env.DEFAULT_ADMIN_PASSWORD || 'admin123'

  const existingAdmin = await Admin.findOne({ email })
  if (existingAdmin) {
    console.log(`Default admin ready: ${email}`)
    return
  }

  await Admin.create({ email, password })
  console.log(`Default admin created: ${email}`)
}

export default seedDefaultAdmin
