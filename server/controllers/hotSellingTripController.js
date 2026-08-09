import HotSellingTrip from '../models/HotSellingTrip.js'

const toBoolean = (value) => {
  if (value === undefined || value === null) return true
  if (typeof value === 'boolean') return value
  return value === 'active' || value === 'true'
}

const normalizePrice = (value) => {
  if (value === undefined || value === null || value === '') return null
  return Number(value)
}

const normalizeHotSellingTripPayload = (body) => ({
  name: body.name?.trim(),
  image: body.image?.trim(),
  price: normalizePrice(body.price),
  isActive: toBoolean(body.isActive),
})

export const getHotSellingTrips = async (req, res) => {
  const filter = {}
  if (req.query.includeInactive !== 'true') filter.isActive = true

  const trips = await HotSellingTrip.find(filter).sort({ createdAt: -1 })
  res.json(trips)
}

export const createHotSellingTrip = async (req, res) => {
  const trip = await HotSellingTrip.create(normalizeHotSellingTripPayload(req.body))
  res.status(201).json({ message: 'Hot selling trip created', trip })
}

export const updateHotSellingTrip = async (req, res) => {
  const trip = await HotSellingTrip.findByIdAndUpdate(req.params.id, normalizeHotSellingTripPayload(req.body), {
    new: true,
    runValidators: true,
  })

  if (!trip) {
    return res.status(404).json({ message: 'Hot selling trip not found' })
  }

  res.json({ message: 'Hot selling trip updated', trip })
}

export const deleteHotSellingTrip = async (req, res) => {
  const trip = await HotSellingTrip.findById(req.params.id)

  if (!trip) {
    return res.status(404).json({ message: 'Hot selling trip not found' })
  }

  await trip.deleteOne()
  res.json({ message: 'Hot selling trip deleted' })
}
