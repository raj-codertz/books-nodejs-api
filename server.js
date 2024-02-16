import 'express-async-errors'
import morgan from "morgan"
import errorHandlerMiddleware  from './Middleware/erroHandlerMiddleware.js'
import express from "express"
const app = express()
import dotenv from 'dotenv'
dotenv.config()
import { connectDB } from "./Config/Db.js"
import { validateTest } from "./Middleware/validationMiddleware.js";
// Routers
import bookRouter from "./Routers/bookRouters.js"


if ( process.env.NODE_ENV === 'development') {
   app.use(morgan('dev'))
}

// Accept json
app.use(express.json())


app.post(
    '/api/v1/books/test',
    validateTest,
    (req, res) => {
    const { name } = req.body;
    res.json({ msg: `Hello ${name}`})
})

app.use('/api/v1/books' , bookRouter )


app.use('*', (req, res) => {
    res.status(404).json({ msg: 'Not Found' })
})

app.use( errorHandlerMiddleware )
const port = process.env.PORT || 5100

connectDB().then(r => app.listen(port, () => {
    console.log(` Server is running on PORT ${port}...`)
}) )
