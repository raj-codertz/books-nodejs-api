import 'express-async-errors'
import morgan from "morgan"
import express from "express"
const app = express()
import dotenv from 'dotenv'
dotenv.config()
import { connectDB } from "./Config/Db.js"

// Routers
import bookRouter from "./Routers/bookRouters.js"


if ( process.env.NODE_DEV === 'development') {
   app.use(morgan('dev'))
}

// Accept json
app.use(express.json())

app.use('/api/v1/books' , bookRouter )

app.use('*', (req, res) => {
    res.status(404).json({ msg: 'Not Found' })
})

app.use((err, req, res, next) => {
    res.status(500).json({ message: 'something went wrong'})
})
const port = process.env.PORT || 5100

connectDB().then(r => app.listen(port, () => {
    console.log(` Server is running on PORT ${port}...`)
}) )
