import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import connectDB from './config/db.js'
import authRoutes from './routes/authRoutes.js'
import contactRoutes from './routes/contactRoutes.js'
import inquiryRoutes from './routes/inquiryRoutes.js'
import packageRoutes from './routes/packageRoutes.js'
import destinationRoutes from './routes/destinationRoutes.js'
import categoryRoutes from './routes/categoryRoutes.js'
import searchRoutes from './routes/searchRoutes.js'
import seedDefaultAdmin from './utils/seedDefaultAdmin.js'

const __dirname = dirname(fileURLToPath(import.meta.url))
dotenv.config({ path: resolve(__dirname, '.env') })
await connectDB()
await seedDefaultAdmin()

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors({ origin: process.env.CLIENT_URL || 'http://localhost:5173', credentials: true }))
app.use(express.json())

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'TripNest API is running' })
})

app.use('/api/auth', authRoutes)
app.use('/api/packages', packageRoutes)
app.use('/api/destinations', destinationRoutes)
app.use('/api/categories', categoryRoutes)
app.use('/api/search', searchRoutes)
app.use('/api/contact', contactRoutes)
app.use('/api/inquiry', inquiryRoutes)

app.use((req, res) => {
  res.status(404).json({ message: 'API route not found' })
})

app.use((error, req, res, _next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode
  res.status(statusCode).json({
    message: error.message || 'Server error',
  })
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
