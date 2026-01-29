import express, {Request, Response} from 'express'
import { User } from './types/user.type'
const PORT: number = 3000
const app = express()

// app.get("/", (req: Request, res: Response) => {
//     res.send("<h1>hello express typescript 1</h1>")
// })

// app.get('/users', (req: Request, res: Response) => {
//     const users: User[] = [
//         {
//             id: 1,
//             name: 'An',
//             email: 'an@gmail.com',
//         }
//     ]
//     // const a: any = 10
//     // console.log(a)

//     return res.json(users)
// })

app.listen(PORT, () => {
    console.log(`Start server: http://localhost:${PORT}`);
})