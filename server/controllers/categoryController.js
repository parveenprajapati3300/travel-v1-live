import Category from '../models/Category.js'

const toBoolean = (value) => {
  if (value === undefined || value === null) return true
  if (typeof value === 'boolean') return value
  return value === 'active' || value === 'true'
}

const normalizeCategoryPayload = (body) => ({
  name: body.name?.trim(),
  image: body.image?.trim(),
  isActive: toBoolean(body.isActive),
})

export const getCategories = async (req, res) => {
  const filter = {}
  if (req.query.includeInactive !== 'true') filter.isActive = true

  const categories = await Category.find(filter).sort({ createdAt: -1 })
  res.json(categories)
}

export const createCategory = async (req, res) => {
  const category = await Category.create(normalizeCategoryPayload(req.body))
  res.status(201).json({ message: 'Category created', category })
}

export const updateCategory = async (req, res) => {
  const category = await Category.findByIdAndUpdate(req.params.id, normalizeCategoryPayload(req.body), {
    new: true,
    runValidators: true,
  })

  if (!category) {
    return res.status(404).json({ message: 'Category not found' })
  }

  res.json({ message: 'Category updated', category })
}

export const deleteCategory = async (req, res) => {
  const category = await Category.findById(req.params.id)

  if (!category) {
    return res.status(404).json({ message: 'Category not found' })
  }

  await category.deleteOne()
  res.json({ message: 'Category deleted' })
}
