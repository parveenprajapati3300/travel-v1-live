import dotenv from 'dotenv'
import mongoose from 'mongoose'
import process from 'node:process'
import Package from '../models/Package.js'
import { packages } from '../../src/data/packages.js'

dotenv.config({ path: './server/.env' })

const categoryByPackageType = {
  domestic: ['Family Tour'],
  international: ['Honeymoon Tour'],
  group: ['Group Tour'],
  weekend: ['Weekend Tour'],
  customized: ['Family Tour'],
}

const packageTypeById = {
  'ladakh-group-expedition': 'domestic',
  'vietnam-group-trail': 'international',
  'rishikesh-weekend-rush': 'domestic',
  'goa-friends-weekend': 'domestic',
  'honeymoon-custom-escape': 'international',
  'family-custom-holiday': 'domestic',
}

const destinationFromLocation = (location = '') => location.split(',')[0]?.trim() || ''

const normalizePackage = (item) => ({
  ...item,
  category: packageTypeById[item.id] || item.category,
  packageDestination: item.packageDestination || destinationFromLocation(item.location),
  packageCategories: item.packageCategories?.length ? item.packageCategories : categoryByPackageType[item.category] || [],
  isActive: item.isActive ?? true,
})

try {
  await mongoose.connect(process.env.MONGO_URI)

  const results = await Promise.all(
    packages.map((item) =>
      Package.findOneAndUpdate(
        { id: item.id },
        normalizePackage(item),
        { returnDocument: 'after', runValidators: true, upsert: true },
      ),
    ),
  )

  console.log(`Seeded ${results.length} packages:`)
  results.forEach((item) => console.log(`- ${item.title} (${item.category})`))
} catch (error) {
  console.error(`Package seed failed: ${error.message}`)
  process.exitCode = 1
} finally {
  await mongoose.disconnect()
}
