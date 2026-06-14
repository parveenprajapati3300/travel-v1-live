import express from 'express'
import { loginAdmin, seedAdmin } from '../controllers/authController.js'

const router = express.Router()

router.post('/login', loginAdmin)
router.post('/seed-admin', seedAdmin)

export default router
