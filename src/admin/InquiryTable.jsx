import { Button, Table } from 'react-bootstrap'
import { FaCheck, FaTrash } from 'react-icons/fa6'

const formatDate = (date) =>
  new Intl.DateTimeFormat('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }).format(new Date(date))

function InquiryTable({ inquiries, onDelete, onMarkContacted }) {
  return (
    <div className="admin-table-card">
      <div className="admin-table-header">
        <h3>Tour Inquiries</h3>
        <span>{inquiries.length} records</span>
      </div>
      <div className="table-responsive">
        <Table hover className="admin-table align-middle">
          <thead>
            <tr>
              <th>Name</th>
              <th>Destination</th>
              <th>Travel Date</th>
              <th>People</th>
              <th>Budget</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {inquiries.map((item) => (
              <tr key={item._id}>
                <td>
                  <strong>{item.name}</strong>
                  <span>{item.email}<br />{item.phone}</span>
                </td>
                <td>{item.destination}</td>
                <td>{formatDate(item.travelDate)}</td>
                <td>{item.people}</td>
                <td>{item.budget}</td>
                <td><span className={`status-pill ${item.status === 'Contacted' ? 'done' : ''}`}>{item.status}</span></td>
                <td>
                  <div className="table-actions">
                    <Button size="sm" variant="outline-success" onClick={() => onMarkContacted(item._id)} disabled={item.status === 'Contacted'}><FaCheck /></Button>
                    <Button size="sm" variant="outline-danger" onClick={() => onDelete(item._id)}><FaTrash /></Button>
                  </div>
                </td>
              </tr>
            ))}
            {!inquiries.length && (
              <tr><td colSpan="7" className="text-center text-muted py-4">No inquiries found.</td></tr>
            )}
          </tbody>
        </Table>
      </div>
    </div>
  )
}

export default InquiryTable
