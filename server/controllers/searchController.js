import Package from '../models/Package.js'
import Destination from '../models/Destination.js'
import Category from '../models/Category.js'

const escapeRegex = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

const slugify = (value = '') =>
  value
    .toString()
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')

export const getSearchSuggestions = async (req, res) => {
  const query = (req.query.q || '').trim()
  const limit = Number(req.query.limit) || 8
  const nameFilter = query ? new RegExp(escapeRegex(query), 'i') : null

  const [packages, destinations, categories] = await Promise.all([
    Package.find({
      isActive: true,
      ...(nameFilter ? { title: nameFilter } : {}),
    })
      .select('title id image price category packageDestination')
      .sort({ createdAt: -1 })
      .limit(limit),
    Destination.find({
      isActive: true,
      ...(nameFilter ? { name: nameFilter } : {}),
    })
      .select('name image price type')
      .sort({ createdAt: -1 })
      .limit(limit),
    Category.find({
      isActive: true,
      ...(nameFilter ? { name: nameFilter } : {}),
    })
      .select('name image')
      .sort({ createdAt: -1 })
      .limit(limit),
  ])

  const results = [
    ...packages.map((item) => ({
      id: item._id,
      type: 'package',
      label: item.title,
      meta: item.packageDestination || item.category,
      image: item.image,
      url: `/package/${item.id}`,
    })),
    ...destinations.map((item) => ({
      id: item._id,
      type: 'destination',
      label: item.name,
      meta: item.type,
      image: item.image,
      url: `/destination/${slugify(item.name)}`,
    })),
    ...categories.map((item) => ({
      id: item._id,
      type: 'theme',
      label: item.name,
      meta: 'Theme',
      image: item.image,
      url: `/category/${slugify(item.name)}`,
    })),
  ]

  res.json(results.slice(0, limit))
}
