export const slugify = (value = '') =>
  value
    .toString()
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')

export const findBySlug = (items, slug, getValue = (item) => item.name) =>
  items.find((item) => slugify(getValue(item)) === slug)
