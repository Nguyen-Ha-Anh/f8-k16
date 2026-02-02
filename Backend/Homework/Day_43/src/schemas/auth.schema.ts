import * as z from 'zod'

export const RegisterRequest = z.object({
    // email: z
    //     .string()
    //     .min(1, {
    //         message: 'the email cannot be left blank'
    //     })
    //     .pipe(z.email({
    //         message: ''
    //     }))
    email: z.string().email(),
    password: z.string().min(6),
    fullName: z.string().min(1)
})

//login
export const LoginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6)
})

