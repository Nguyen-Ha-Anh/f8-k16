import {Request, Response} from 'express'

export const userController = {
    create: (req: Request, res: Response) => {
        res.json({
            message: "Create user success"
        })
    }
}