import { Spinner } from 'react-bootstrap'

function LoadingSpinner() {
  return (
    <div className="loader-screen">
      <div className="loader-card">
        <Spinner animation="border" role="status" />
        <strong>TripsNThrills</strong>
      </div>
    </div>
  )
}

export default LoadingSpinner
