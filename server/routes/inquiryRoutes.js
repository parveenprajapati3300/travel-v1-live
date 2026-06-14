import express from 'express'
import {
  createInquiry,
  deleteInquiry,
  getInquiries,
  markInquiryContacted,
} from '../controllers/inquiryController.js'
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router()

router.post('/', createInquiry)
router.get('/', protect, getInquiries)
router.patch('/:id/contacted', protect, markInquiryContacted)
router.delete('/:id', protect, deleteInquiry)

export default router
