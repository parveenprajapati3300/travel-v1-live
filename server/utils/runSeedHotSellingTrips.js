import dotenv from 'dotenv'
import mongoose from 'mongoose'
import process from 'node:process'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import seedHotSellingTrips from './seedHotSellingTrips.js'

const __dirname = dirname(fileURLToPath(import.meta.url))
dotenv.config({ path: resolve(__dirname, '..', '.env') })

try {
  await mongoose.connect(process.env.MONGO_URI)
  const results = await seedHotSellingTrips()
  console.log(`Seeded ${results.length} hot selling trips:`)
  results.forEach((trip) => console.log(`- ${trip.name}`))
} catch (error) {
  console.error(`Hot selling trips seed failed: ${error.message}`)
  process.exitCode = 1
} finally {
  await mongoose.disconnect()
}
