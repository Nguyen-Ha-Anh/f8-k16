import express from 'express'
import path from 'node:path'
import homeRoute from './routes/home.route'
import loginRoute from './routes/login.route'
import cookieParser from 'cookie-parser'

const PORT: number = 3000
const app = express()

app.use(express.json())
app.use(express.urlencoded())
app.use(cookieParser())

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.use('/', homeRoute)
app.use('/', loginRoute)
app.listen(PORT, () => {
    console.log(`Start server: http://localhost:${PORT}`);
})