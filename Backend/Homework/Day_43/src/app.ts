console.log("APP.TS LOADED");

import express from 'express'
import {Request, Response} from 'express'

const PORT: number = 3000
const app = express()

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
    res.send('Hello ae')
})

import authRoute from './routes/auth.route'

app.use('/api/auth', authRoute)

app.listen(PORT, () => {
    console.log(`Start server: http://localhost:${PORT}`);
})
