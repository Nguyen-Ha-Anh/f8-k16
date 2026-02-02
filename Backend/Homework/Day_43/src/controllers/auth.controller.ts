import { Request, Response } from "express";
import { authService } from "../services/auth.service";

export const authController = {
    register: (req: Request, res: Response) => {
        // res.json({
        //     "success": true,
        //     "message": "register successful",
        //     "data": user
        // })
        try {
            //goi service
            const user = authService.register(req.body)

            //tra ve ket qua thanh cong
            return res.status(201).json({
                success: true,
                message: 'register successful',
                data: user
            })
        } catch (err: any) {
            //trung email
            if (err.message === 'emailExists') {
                return res.status(409).json({
                    success: false,
                    message: 'email already exists',
                    data: null
                })
            }
        }
    },

    login: (req: Request, res: Response) => {
        try {
            const user = authService.login(req.body)

            return res.status(200).json({
                success: true,
                message: 'login successful',
                data: user
            })
        } catch (err: any) {
            return res.status(400).json({
                success: false,
                message: err.message,
                data: null
            })
        }
    }
}

