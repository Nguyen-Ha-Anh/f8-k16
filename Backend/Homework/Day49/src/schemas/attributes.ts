import z from 'zod'

export const createAttributeSchema = z.object({
    name: z.string().min(1)
})

export const updateAttributeSchema = z.object({
    name: z.string().min(1).optional()
})

export const createAttributeValueSchema = z.object({
    value: z.string().min(1)
})