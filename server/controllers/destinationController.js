import Destination from '../models/Destination.js'

const toBoolean = (value) => {
  if (value === undefined || value === null) return true
  if (typeof value === 'boolean') return value
  return value === 'active' || value === 'true'
}

const normalizeDestinationPayload = (body) => ({
  name: body.name?.trim(),
  type: body.type || 'domestic',
  image: body.image?.trim(),
  price: Number(body.price),
  isActive: toBoolean(body.isActive),
})

export const getDestinations = async (req, res) => {
  const filter = {}
  if (req.query.type === 'domestic') filter.$or = [{ type: 'domestic' }, { type: { $exists: false } }]
  if (req.query.type === 'international') filter.type = 'international'
  if (req.query.includeInactive !== 'true') filter.isActive = true

  const destinations = await Destination.find(filter).sort({ createdAt: -1 })
  res.json(destinations)
}

export const createDestination = async (req, res) => {
  const destination = await Destination.create(normalizeDestinationPayload(req.body))
  res.status(201).json({ message: 'Destination created', destination })
}

export const updateDestination = async (req, res) => {
  const destination = await Destination.findByIdAndUpdate(req.params.id, normalizeDestinationPayload(req.body), {
    new: true,
    runValidators: true,
  })

  if (!destination) {
    return res.status(404).json({ message: 'Destination not found' })
  }

  res.json({ message: 'Destination updated', destination })
}

export const deleteDestination = async (req, res) => {
  const destination = await Destination.findById(req.params.id)

  if (!destination) {
    return res.status(404).json({ message: 'Destination not found' })
  }

  await destination.deleteOne()
  res.json({ message: 'Destination deleted' })
}
