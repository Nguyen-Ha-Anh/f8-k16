import { createAttributeSchema, createAttributeValueSchema, updateAttributeSchema } from "../schemas/attributes"
import { attributeService } from "../services/attribute.service"
import {Request, Response} from 'express'

export const attributeController = {
    index: async (req: Request, res: Response) => {
        const data = await attributeService.getAll()
        res.json(data)
    },
    find: async (req: Request, res: Response) => {
        const {id} = req.params
        const data = await attributeService.find(Number(id))
        res.json(data)
    },
    create: async (req: Request, res: Response) => {
        const parse = createAttributeSchema.safeParse(req.body)
        if (!parse.success) {
            return res.status(400).json({ message: 'error' })
        }

        const data = await attributeService.create(parse.data)
        res.json(data)
    },
    update: async (req: Request, res: Response) => {
        const {id} = req.params
        const parse = updateAttributeSchema.safeParse(req.body)
        if (!parse.success) {
        return res.status(400).json({ message: "error" })
    }
        const data = await attributeService.update(+id!, parse.data.name!)
        res.json(data)
    },
    delete: async (req: Request, res: Response) => {
        try {
            const {id} = req.params
            const data = await attributeService.delete(Number(id))
            res.json(data)
        } catch (err: any) {
            res.status(404).json({
                message: err.message
            })
        }
    },
    createValue: async (req: Request, res: Response) => {
        const {id} = req.params
        
        const parsed = createAttributeValueSchema.safeParse(req.body)
        if (!parsed.success) {
            return res.status(400).json({ message: "error" })
        }

    const data = await attributeService.createValue(+id!, parsed.data.value)
    res.json(data)
    },
    deleteValue: async (req: Request, res: Response) => {
        try {
            const {valueId} = req.params
            await attributeService.deleteValue(Number(valueId))
            res.json({message: 'deleted value'})
        } catch (err: any) {
            console.error(err);
            
            res.status(400).json({
                message: 'failed',
                error: err.message
            })
        }
    } 
}