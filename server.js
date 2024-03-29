import 'express-async-errors'
import morgan from "morgan"
import errorHandlerMiddleware  from './Middleware/erroHandlerMiddleware.js'
import express from "express"
const app = express()
import dotenv from 'dotenv'
dotenv.config()
import { connectDB } from "./Config/Db.js"
// Routers
import bookRouter from "./Routers/bookRouters.js"
import authRouter from "./Routers/authRouters.js"
import {authenticateUser} from "./Middleware/authMiddleware.js";
import cookieParser from 'cookie-parser'


if ( process.env.NODE_ENV === 'development') {
   app.use(morgan('dev'))
}


app.use(cookieParser())
// Accept json
app.use(express.json())


app.use('/api/v1/books' , authenticateUser, bookRouter )
app.use('/api/v1/auth', authRouter)


app.use('*', (req, res) => {
    res.status(404).json({ msg: 'Not Found' })
})

app.use( errorHandlerMiddleware )
const port = process.env.PORT || 5100

connectDB().then(r => app.listen(port, () => {
    console.log(` Server is running on PORT ${port}...`)
}) )
