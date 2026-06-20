import { useState } from 'react'
import { Modal } from 'react-bootstrap'
import { FaWhatsapp } from 'react-icons/fa6'
import { MdOutlineEditNote } from 'react-icons/md'
import InquiryForm from './InquiryForm'

const whatsappNumber = '919876543210'
const whatsappMessage = encodeURIComponent('Hi TNT Tour and Travels, I want to plan a trip.')

function FloatingActions() {
  const [showInquiry, setShowInquiry] = useState(false)

  return (
    <>
      <div className="floating-actions" aria-label="Quick actions">
        <a
          className="floating-action whatsapp"
          href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
          target="_blank"
          rel="noreferrer"
          aria-label="Chat on WhatsApp"
        >
          <FaWhatsapp />
        </a>
        <button
          className="floating-action inquiry"
          type="button"
          aria-label="Open inquiry form"
          onClick={() => setShowInquiry(true)}
        >
          <MdOutlineEditNote />
        </button>
      </div>

      <Modal show={showInquiry} onHide={() => setShowInquiry(false)} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Send Inquiry</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <InquiryForm onSuccess={() => setShowInquiry(false)} />
        </Modal.Body>
      </Modal>
    </>
  )
}

export default FloatingActions
