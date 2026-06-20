import dotenv from 'dotenv'
import mongoose from 'mongoose'
import process from 'node:process'
import Destination from '../models/Destination.js'
import Package from '../models/Package.js'

dotenv.config({ path: './server/.env' })

const destinationFromPackage = (packageItem) =>
  (packageItem.packageDestination || packageItem.location?.split(',')[0] || '').trim()

try {
  await mongoose.connect(process.env.MONGO_URI)

  const packages = await Package.find({ isActive: true }).sort({ createdAt: -1 })
  const destinationMap = new Map()

  packages.forEach((packageItem) => {
    const name = destinationFromPackage(packageItem)
    if (!name) return

    const key = name.toLowerCase()
    const current = destinationMap.get(key)
    const nextPrice = Number(packageItem.price) || 0

    if (!current) {
      destinationMap.set(key, {
        name,
        type: packageItem.category === 'international' ? 'international' : 'domestic',
        image: packageItem.image,
        price: nextPrice,
        isActive: true,
      })
      return
    }

    current.price = Math.min(current.price || nextPrice, nextPrice || current.price)
    if (!current.image && packageItem.image) current.image = packageItem.image
    if (packageItem.category === 'international') current.type = 'international'
  })

  const destinations = [...destinationMap.values()].filter((destination) => destination.image && destination.price)

  const results = await Promise.all(
    destinations.map((destination) =>
      Destination.findOneAndUpdate(
        { name: destination.name },
        destination,
        { returnDocument: 'after', runValidators: true, upsert: true },
      ),
    ),
  )

  console.log(`Seeded ${results.length} destinations from packages:`)
  results.forEach((destination) => {
    console.log(`- ${destination.name} (${destination.type}) - ${destination.price}`)
  })
} catch (error) {
  console.error(`Destination seed failed: ${error.message}`)
  process.exitCode = 1
} finally {
  await mongoose.disconnect()
}
