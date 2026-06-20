import { Navigate } from 'react-router-dom'

function ProtectedRoute({ children }) {
  const token = localStorage.getItem('tripnest_admin_token')
  return token ? children : <Navigate to="/admin-login" replace />
}

export default ProtectedRoute
