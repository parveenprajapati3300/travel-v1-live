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

function InquiryTable({ inquiries, onDelete }) {
  const [selectedInquiry, setSelectedInquiry] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const totalPages = Math.max(1, Math.ceil(inquiries.length / PAGE_SIZE))
  const activePage = Math.min(currentPage, totalPages)
  const paginatedInquiries = useMemo(
    () => inquiries.slice((activePage - 1) * PAGE_SIZE, activePage * PAGE_SIZE),
    [activePage, inquiries],
  )

  return (
    <>
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
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedInquiries.map((item) => (
                <tr key={item._id}>
                  <td>
                    <strong>{item.name}</strong>
                    <span>{item.email}<br />{item.phone}</span>
                  </td>
                  <td>{item.destination}</td>
                  <td>{formatDate(item.travelDate)}</td>
                  <td>{item.people}</td>
                  <td>{item.budget}</td>
                  <td>
                    <div className="table-actions">
                      <Button size="sm" variant="outline-primary" aria-label="View inquiry" onClick={() => setSelectedInquiry(item)}><FaEye /></Button>
                      <Button size="sm" variant="outline-danger" aria-label="Delete inquiry" onClick={() => onDelete(item._id)}><FaTrash /></Button>
                    </div>
                  </td>
                </tr>
              ))}
              {!inquiries.length && (
                <tr><td colSpan="6" className="text-center text-muted py-4">No inquiries found.</td></tr>
              )}
            </tbody>
          </Table>
        </div>
        <AdminPagination currentPage={activePage} onPageChange={setCurrentPage} totalItems={inquiries.length} />
      </div>

      <Modal show={Boolean(selectedInquiry)} onHide={() => setSelectedInquiry(null)} centered size="lg" className="admin-detail-modal">
        <Modal.Header closeButton>
          <Modal.Title>Inquiry Details</Modal.Title>
        </Modal.Header>
        {selectedInquiry && (
          <Modal.Body>
            <div className="detail-modal-summary">
              <div>
                <span>Customer</span>
                <strong>{selectedInquiry.name}</strong>
              </div>
            </div>
            <div className="detail-grid">
              <div><span>Email</span><strong>{selectedInquiry.email}</strong></div>
              <div><span>Phone</span><strong>{selectedInquiry.phone}</strong></div>
              <div><span>Destination</span><strong>{selectedInquiry.destination}</strong></div>
              <div><span>Travel Date</span><strong>{formatDate(selectedInquiry.travelDate)}</strong></div>
              <div><span>People</span><strong>{selectedInquiry.people}</strong></div>
              <div><span>Budget</span><strong>{selectedInquiry.budget}</strong></div>
              <div><span>Created</span><strong>{formatDateTime(selectedInquiry.createdAt)}</strong></div>
              <div><span>Updated</span><strong>{formatDateTime(selectedInquiry.updatedAt)}</strong></div>
            </div>
            <div className="detail-message">
              <span>Message</span>
              <p>{selectedInquiry.message || 'No message added.'}</p>
            </div>
          </Modal.Body>
        )}
      </Modal>
    </>
  )
}

export default InquiryTable
