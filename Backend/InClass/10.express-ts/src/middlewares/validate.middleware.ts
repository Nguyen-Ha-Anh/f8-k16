import {NextFunction, Request, Response} from 'express'

export const validate = (schema: ZodObject) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        const body = await schema.safeParseAsync(req.body)
        if (!body) {
            return res.status(400).json({
                message: "Validate failed",
                errors: body.error,
            })
        }
        req.body = body
        next()
    }
}