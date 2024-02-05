const morgan = require('morgan')
const express = require('express')
const app = express()
const dotenv= require('dotenv')
dotenv.config()

if ( process.env.NODE_ENV === 'development') {
   app.use(morgan('dev'))
}
// Accept json
app.use(express.json())

app.get('/home', (req, res) => {
    return res.json({ msg: "Hello raj"})
})

app.listen(5000, () => {
    console.log("server is running on port 5000")
})