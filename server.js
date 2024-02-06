const morgan = require('morgan')
const express = require('express')
const app = express()
const dotenv= require('dotenv')
dotenv.config()

if ( process.env.NODE_DEV === 'development') {
   app.use(morgan('dev'))
}
// Accept json
app.use(express.json())

app.get('/home', (req, res) => {
    return res.json({ msg: "Hello raj"})
})

app.use('*', (req, res) => {
    res.status(404).json({ msg: 'Not Found' })
})

app.use((err, req, res, next) => {
    res.status(500).json({ msg: 'something went wrong'})
})
const port = process.env.PORT || 5100
app.listen(port, () => {
    console.log(` Server is running on PORT ${port}...`)
})