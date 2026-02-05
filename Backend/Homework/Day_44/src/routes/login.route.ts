import express from 'express'
import {Request, Response} from 'express'
import { handleLogin, login } from '../controllers/auth.controller'

export const router = express.Router()
router.get('/', (req: Request, res: Response) => {
    if (!req.cookies.isLogin) {
        return res.redirect('/login')
    }
    return res.render('home')
})

router.get('/login', login)
router.post('/login', handleLogin)

export default router