import { Button, Table } from 'react-bootstrap'
import { FaTrash } from 'react-icons/fa6'

const formatDate = (date) =>
  new Intl.DateTimeFormat('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }).format(new Date(date))

function ContactTable({ contacts, onDelete }) {
  return (
    <div className="admin-table-card">
      <div className="admin-table-header">
        <h3>Contact Messages</h3>
        <span>{contacts.length} records</span>
      </div>
      <div className="table-responsive">
        <Table hover className="admin-table align-middle">
          <thead>
            <tr>
              <th>Name</th>
              <th>Subject</th>
              <th>Message</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((item) => (
              <tr key={item._id}>
                <td>
                  <strong>{item.name}</strong>
                  <span>{item.email}<br />{item.phone}</span>
                </td>
                <td>{item.subject}</td>
                <td className="message-cell">{item.message}</td>
                <td>{formatDate(item.createdAt)}</td>
                <td>
                  <Button size="sm" variant="outline-danger" onClick={() => onDelete(item._id)}><FaTrash /></Button>
                </td>
              </tr>
            ))}
            {!contacts.length && (
              <tr><td colSpan="5" className="text-center text-muted py-4">No contact messages found.</td></tr>
            )}
          </tbody>
        </Table>
      </div>
    </div>
  )
}

export default ContactTable
