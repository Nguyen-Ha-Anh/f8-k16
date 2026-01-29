import express from 'express'
import {homeController} from '../controllers/home.controller'
import {userController} from "../controllers/user.controller"
import {validate} from "../middlewares/validate.middleware"

const router = express.Router()
router.get('/', homeController.index)

router.post("/users", userController.create)

export default router;