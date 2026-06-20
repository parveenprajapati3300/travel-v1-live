import express from 'express'
import {
  createDestination,
  deleteDestination,
  getDestinations,
  updateDestination,
} from '../controllers/destinationController.js'
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router()

router.get('/', getDestinations)
router.post('/', protect, createDestination)
router.patch('/:id', protect, updateDestination)
router.delete('/:id', protect, deleteDestination)

export default router
