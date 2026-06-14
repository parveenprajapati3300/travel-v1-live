import Package from '../models/Package.js'

const slugify = (value) =>
  value
    .toString()
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')

const toList = (value) => {
  if (Array.isArray(value)) return value.filter(Boolean)
  if (!value) return []
  return value
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean)
}

const normalizeItinerary = (value) => {
  if (Array.isArray(value)) return value
  if (!value) return []

  return value
    .split('\n')
    .map((line, index) => {
      const [title, ...details] = line.split(':')
      return {
        day: index + 1,
        title: title?.trim() || `Day ${index + 1}`,
        details: details.join(':').trim() || line.trim(),
      }
    })
    .filter((item) => item.details)
}

const toBoolean = (value) => {
  if (value === undefined || value === null) return true
  if (typeof value === 'boolean') return value
  return value === 'active' || value === 'true'
}

const normalizePackagePayload = (body) => ({
  id: body.id ? slugify(body.id) : slugify(body.title),
  category: body.category,
  packageDestination: body.packageDestination || body.location,
  packageCategories: toList(body.packageCategories),
  title: body.title,
  image: body.image,
  duration: body.duration,
  price: Number(body.price),
  location: body.location,
  rating: body.rating ? Number(body.rating) : 4.8,
  description: body.description,
  highlights: toList(body.highlights),
  included: toList(body.included),
  excluded: toList(body.excluded),
  itinerary: normalizeItinerary(body.itinerary),
  hotel: body.hotel || '',
  transport: body.transport || '',
  gallery: toList(body.gallery),
  reviews: toList(body.reviews),
  isActive: toBoolean(body.isActive),
})

export const getPackages = async (req, res) => {
  const filter = {}
  if (req.query.category) filter.category = req.query.category
  if (req.query.includeInactive !== 'true') filter.isActive = true

  const packages = await Package.find(filter).sort({ createdAt: -1 })
  res.json(packages)
}

export const getPackageById = async (req, res) => {
  const filter = { id: req.params.id }
  if (req.query.includeInactive !== 'true') filter.isActive = true

  const packageItem = await Package.findOne(filter)

  if (!packageItem) {
    return res.status(404).json({ message: 'Package not found' })
  }

  res.json(packageItem)
}

export const createPackage = async (req, res) => {
  const payload = normalizePackagePayload(req.body)
  const packageItem = await Package.create(payload)
  res.status(201).json({ message: 'Package created', package: packageItem })
}

export const updatePackage = async (req, res) => {
  const payload = normalizePackagePayload(req.body)
  const packageItem = await Package.findByIdAndUpdate(req.params.id, payload, {
    new: true,
    runValidators: true,
  })

  if (!packageItem) {
    return res.status(404).json({ message: 'Package not found' })
  }

  res.json({ message: 'Package updated', package: packageItem })
}

export const deletePackage = async (req, res) => {
  const packageItem = await Package.findById(req.params.id)

  if (!packageItem) {
    return res.status(404).json({ message: 'Package not found' })
  }

  await packageItem.deleteOne()
  res.json({ message: 'Package deleted' })
}
