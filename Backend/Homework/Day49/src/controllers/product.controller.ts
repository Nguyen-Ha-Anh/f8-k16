import { updateProductSchema } from "../schemas/products"
import { productService } from "../services/product.service"
import {Request, Response} from 'express'

export const productController = {
    index: async (req: Request, res: Response) => {
        const products = await productService.getAll()
        res.json(products)
    },
    find: async (req: Request, res: Response) => {
        const {id} = req.params
        const product = await productService.find(Number(id))
        res.json(product)
    },
    create: async (req: Request, res: Response) => {
        const name = req.body 
        const products = await productService.create(name)
        res.json(products)
    },
    update: async (req: Request, res: Response) => {
        const {id} = req.params
        const parse = updateProductSchema.safeParse(req.body)
        if(!parse.success) return res.status(400).json({message: "product error"})
        const product = await productService.update(+id!, req.body)
        res.json(product)
    },
    delete: async (req: Request, res: Response) => {
        try {
            const {id} = req.params
            const product = await productService.delete(Number(id))
            res.json(product)
        } catch(err: any) {
            res.status(400).json({
                message: err.message
            })
        }
    }
}