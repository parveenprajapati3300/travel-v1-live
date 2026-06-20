import dotenv from 'dotenv'
import mongoose from 'mongoose'
import process from 'node:process'
import Category from '../models/Category.js'

dotenv.config({ path: './server/.env' })

const categories = [
  {
    name: 'Group Tour',
    image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80',
    isActive: true,
  },
  {
    name: 'Honeymoon Tour',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80',
    isActive: true,
  },
  {
    name: 'Solo Trip',
    image: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1200&q=80',
    isActive: true,
  },
  {
    name: 'Weekend Tour',
    image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1200&q=80',
    isActive: true,
  },
  {
    name: 'Ladies Special Tour',
    image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1200&q=80',
    isActive: true,
  },
  {
    name: 'Hill Station Tour',
    image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1200&q=80',
    isActive: true,
  },
  {
    name: 'Family Tour',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
    isActive: true,
  },
  {
    name: 'Adventure Tour',
    image: 'https://images.unsplash.com/photo-1522163182402-834f871fd851?auto=format&fit=crop&w=1200&q=80',
    isActive: true,
  },
]

try {
  await mongoose.connect(process.env.MONGO_URI)

  const results = await Promise.all(
    categories.map((category) =>
      Category.findOneAndUpdate(
        { name: category.name },
        category,
        { returnDocument: 'after', runValidators: true, upsert: true },
      ),
    ),
  )

  console.log(`Seeded ${results.length} categories:`)
  results.forEach((category) => console.log(`- ${category.name}`))
} catch (error) {
  console.error(`Category seed failed: ${error.message}`)
  process.exitCode = 1
} finally {
  await mongoose.disconnect()
}
