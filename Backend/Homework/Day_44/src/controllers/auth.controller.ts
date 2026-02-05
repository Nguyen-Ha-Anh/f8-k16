import {Request, Response} from 'express'

const adminEmail = 'admin@gmail.com'
const adminPassword = '123456'

export const login = (req: Request, res: Response) => {
    if (req.cookies.isLogin === 'true') {
        return res.redirect('/')
    }

    let message = null

    if (req.query.message === 'logout') {
        message = 'Logout thanh cong'
    }

    res.render('login', {error: null, message})
}

//post
export const handleLogin = (req: Request, res: Response) => {
    const {email, password} = req.body

    if (!email || !password) {
        return res.render('login', {
            error: 'nhap day du thong tin di!!!',
            message: null
        })
    }

    if (email !== adminEmail || password !== adminPassword) {
        return res.render('login', {
            error: 'email or password khong chinh xac bro oi',
            message: null
        })
    }

    res.cookie('isLogin', 'true')
    res.redirect('/')
}

export const logout = (req: Request, res: Response) => {
    res.clearCookie('isLogin')
    res.redirect('/login?message=logout')
}