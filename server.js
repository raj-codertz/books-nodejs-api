import 'express-async-errors'
import morgan from "morgan"
import errorHandlerMiddleware  from './Middleware/erroHandlerMiddleware.js'
import express from "express"
const app = express()
import dotenv from 'dotenv'
dotenv.config()
import { connectDB } from "./Config/Db.js"
import { body , validationResult } from "express-validator";

// Routers
import bookRouter from "./Routers/bookRouters.js"


if ( process.env.NODE_ENV === 'development') {
   app.use(morgan('dev'))
}

// Accept json
app.use(express.json())


app.post(
    '/api/v1/books/test',
    [ body('name').notEmpty().withMessage('name is required')],
    (req, res,next ) => {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
          const errorMessage = errors.array().map(error => error.msg)
          return res.status(400).json({ msg: errorMessage})
      }
        next();
    },
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
