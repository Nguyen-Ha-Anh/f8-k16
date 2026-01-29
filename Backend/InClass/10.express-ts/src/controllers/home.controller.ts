import {Request, Response} from 'express'
import {userService} from '../services/user.service'

export const homeController = {
    index: (req: Request, res: Response) => {

        //tiep nhan -> xu ly request

        //goi service
        const users = userService.getAll()
        res.json({users})
    },
};