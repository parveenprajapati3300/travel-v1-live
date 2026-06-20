import express from 'express'
import { getSearchSuggestions } from '../controllers/searchController.js'

const router = express.Router()

router.get('/', getSearchSuggestions)

export default router
