import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
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
export const getPackages = (category) => api.get('/packages', { params: category ? { category } : {} })
export const getAdminPackages = () => api.get('/packages', { params: { includeInactive: true } })
export const getPackage = (id) => api.get(`/packages/${id}`)
export const createPackage = (payload) => api.post('/packages', payload)
export const updatePackage = (id, payload) => api.patch(`/packages/${id}`, payload)
export const deletePackage = (id) => api.delete(`/packages/${id}`)

export default api
