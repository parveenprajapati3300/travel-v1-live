import axios from 'axios'

const isLocalhost =
  typeof window !== 'undefined' &&
  ['localhost', '127.0.0.1', '::1'].includes(window.location.hostname)

const api = axios.create({
  baseURL:
    import.meta.env.VITE_API_URL ||
    (isLocalhost ? 'http://localhost:5000/api' : '/api'),
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('tripnest_admin_token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export const loginAdmin = (payload) => api.post('/auth/login', payload)
export const submitInquiry = (payload) => api.post('/inquiry', payload)
export const getInquiries = () => api.get('/inquiry')
export const markInquiryContacted = (id) => api.patch(`/inquiry/${id}/contacted`)
export const deleteInquiry = (id) => api.delete(`/inquiry/${id}`)
export const submitContact = (payload) => api.post('/contact', payload)
export const getContacts = () => api.get('/contact')
export const deleteContact = (id) => api.delete(`/contact/${id}`)
export const getPackages = (category, packageCategory, destination) => api.get('/packages', {
  params: {
    ...(category ? { category } : {}),
    ...(packageCategory ? { packageCategory } : {}),
    ...(destination ? { destination } : {}),
  },
})
export const getPackagesByCategory = (packageCategory) => getPackages('', packageCategory)
export const getPackagesByDestination = (destination) => getPackages('', '', destination)
export const getAdminPackages = () => api.get('/packages', { params: { includeInactive: true } })
export const getPackage = (id) => api.get(`/packages/${id}`)
export const createPackage = (payload) => api.post('/packages', payload)
export const updatePackage = (id, payload) => api.patch(`/packages/${id}`, payload)
export const deletePackage = (id) => api.delete(`/packages/${id}`)
export const getDestinations = (type) => api.get('/destinations', { params: type ? { type } : {} })
export const getAdminDestinations = () => api.get('/destinations', { params: { includeInactive: true } })
export const createDestination = (payload) => api.post('/destinations', payload)
export const updateDestination = (id, payload) => api.patch(`/destinations/${id}`, payload)
export const deleteDestination = (id) => api.delete(`/destinations/${id}`)
export const getCategories = () => api.get('/categories')
export const getAdminCategories = () => api.get('/categories', { params: { includeInactive: true } })
export const createCategory = (payload) => api.post('/categories', payload)
export const updateCategory = (id, payload) => api.patch(`/categories/${id}`, payload)
export const deleteCategory = (id) => api.delete(`/categories/${id}`)
export const getSearchSuggestions = (query) => api.get('/search', {
  params: query ? { q: query } : {},
})

export default api
