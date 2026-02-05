import express from 'express'
import { login, logout } from '../controllers/auth.controller'

export const router = express.Router()
router.get('/login', login)

router.get('/logout', logout)

export default router
