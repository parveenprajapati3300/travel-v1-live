import express from 'express'
import {
  createHotSellingTrip,
  deleteHotSellingTrip,
  getHotSellingTrips,
  updateHotSellingTrip,
} from '../controllers/hotSellingTripController.js'
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router()

router.get('/', getHotSellingTrips)
router.post('/', protect, createHotSellingTrip)
router.patch('/:id', protect, updateHotSellingTrip)
router.delete('/:id', protect, deleteHotSellingTrip)

export default router
