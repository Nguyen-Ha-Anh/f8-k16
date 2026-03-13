import { userService } from "../services/user.service"
import {Request, Response} from 'express'

export const userController = {
    index: async (req: Request, res: Response) => {
        const users = await userService.getAll()
        res.json(users)
    },
    find: async (req: Request, res: Response) => {
        const { id } = req.params;
        const user = await userService.find(Number(id))
        res.json(user)
    },
    search: async (req: Request, res: Response) => {
        const username = req.query.username as string
        const users = await userService.search(username)
        res.json(users)
    },
    create: async (req: Request, res: Response) => {
        try {
            const user = await userService.create(req.body)
            res.json({user})
        } catch (err: any) {
            res.status(400).json({
                message: err.message
            })
        }
    },
    update: async (req: Request, res: Response) => {
        try {
            const { id } = req.params;

            const user = await userService.update(req.body, +id!);
            res.json(user);
        } catch (err:any) {
            res.status(404).json({
                message: err.message
            })
        }
    },
    delete: async (req: Request, res: Response) => {
        try {
            const {id} = req.params
            const user = await userService.delete(Number(id))
            res.json(user)
        } catch(err: any) {
            res.status(404).json({
                message: err.message
            })
        }
    },
}