import * as z from "zod"

export const userSchema = z.object({
    name: z.string().min(1, {
        message: "Name is not empty"
    }),
    email: z
        .string()
        .min(1, {
            message: 'Email is not empty'
        })
        .pipe(
            z.email({
                message: 'Email khong dung dinh dang'
            })
        )
})