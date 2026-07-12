import express from 'express'
import {
  createCategory,
  deleteCategory,
  getCategories,
  updateCategory,
} from '../controllers/categoryController.js'
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router()

router.get('/', getCategories)
router.post('/', protect, createCategory)
router.patch('/:id', protect, updateCategory)
router.delete('/:id', protect, deleteCategory)

export default router
