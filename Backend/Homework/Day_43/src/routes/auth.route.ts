import express from 'express'
import { authController } from '../controllers/auth.controller'
import { LoginSchema, RegisterRequest } from '../schemas/auth.schema'
import { validate } from '../middlewares/validate.middleware'

export const router = express.Router()
router.post('/register', validate(RegisterRequest), authController.register)

router.post('/login', validate(LoginSchema), authController.login)

export default router