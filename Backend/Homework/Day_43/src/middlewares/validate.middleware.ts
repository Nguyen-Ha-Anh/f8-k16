import {Request, Response, NextFunction} from "express"
import * as z from 'zod'

export const validate = (schema: z.ZodObject<any>) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        //zod check body
        const body = await schema.safeParseAsync(req.body)

        //sai --> tra loi va dung 
        if (!body.success) {
            return res.status(400).json({
                success: false,
                message: 'validate failed',
                data: body.error.issues
            })
        }
        //dung --> gan du lieu lai cho req.body
        req.body = body.data
        next()
    }
}