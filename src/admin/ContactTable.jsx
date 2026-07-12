import { useMemo, useState } from 'react'
import { Button, Modal, Table } from 'react-bootstrap'
import { FaEye, FaTrash } from 'react-icons/fa6'
import AdminPagination, { PAGE_SIZE } from './AdminPagination'

const formatDate = (date) =>
  new Intl.DateTimeFormat('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }).format(new Date(date))

const formatDateTime = (date) =>
  new Intl.DateTimeFormat('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(date))

function ContactTable({ contacts, onDelete }) {
  const [selectedContact, setSelectedContact] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const totalPages = Math.max(1, Math.ceil(contacts.length / PAGE_SIZE))
  const activePage = Math.min(currentPage, totalPages)
  const paginatedContacts = useMemo(
    () => contacts.slice((activePage - 1) * PAGE_SIZE, activePage * PAGE_SIZE),
    [activePage, contacts],
  )

  return (
    <>
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
              {paginatedContacts.map((item) => (
                <tr key={item._id}>
                  <td>
                    <strong>{item.name}</strong>
                    <span>{item.email}<br />{item.phone}</span>
                  </td>
                  <td>{item.subject}</td>
                  <td className="message-cell">{item.message}</td>
                  <td>{formatDate(item.createdAt)}</td>
                  <td>
                    <div className="table-actions">
                      <Button size="sm" variant="outline-primary" aria-label="View contact message" onClick={() => setSelectedContact(item)}><FaEye /></Button>
                      <Button size="sm" variant="outline-danger" aria-label="Delete contact message" onClick={() => onDelete(item._id)}><FaTrash /></Button>
                    </div>
                  </td>
                </tr>
              ))}
              {!contacts.length && (
                <tr><td colSpan="5" className="text-center text-muted py-4">No contact messages found.</td></tr>
              )}
            </tbody>
          </Table>
        </div>
        <AdminPagination currentPage={activePage} onPageChange={setCurrentPage} totalItems={contacts.length} />
      </div>

      <Modal show={Boolean(selectedContact)} onHide={() => setSelectedContact(null)} centered size="lg" className="admin-detail-modal">
        <Modal.Header closeButton>
          <Modal.Title>Contact Details</Modal.Title>
        </Modal.Header>
        {selectedContact && (
          <Modal.Body>
            <div className="detail-modal-summary">
              <div>
                <span>Customer</span>
                <strong>{selectedContact.name}</strong>
              </div>
              <span>{formatDate(selectedContact.createdAt)}</span>
            </div>
            <div className="detail-grid">
              <div><span>Email</span><strong>{selectedContact.email}</strong></div>
              <div><span>Phone</span><strong>{selectedContact.phone}</strong></div>
              <div><span>Subject</span><strong>{selectedContact.subject}</strong></div>
              <div><span>Created</span><strong>{formatDateTime(selectedContact.createdAt)}</strong></div>
              <div><span>Updated</span><strong>{formatDateTime(selectedContact.updatedAt)}</strong></div>
            </div>
            <div className="detail-message">
              <span>Message</span>
              <p>{selectedContact.message}</p>
            </div>
          </Modal.Body>
        )}
      </Modal>
    </>
  )
}

export default ContactTable
