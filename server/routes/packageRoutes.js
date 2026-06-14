import express from 'express'
import {
  createPackage,
  deletePackage,
  getPackageById,
  getPackages,
  updatePackage,
} from '../controllers/packageController.js'
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router()

router.get('/', getPackages)
router.get('/:id', getPackageById)
router.post('/', protect, createPackage)
router.patch('/:id', protect, updatePackage)
router.delete('/:id', protect, deletePackage)

export default router
