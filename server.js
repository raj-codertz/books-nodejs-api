const express = require('express')

const app = express()

app.get('/home', (req, res) => {
    return res.json({ msg: "Hello raj"})
})

app.listen(5000, () => {
    console.log("server is running on port 5000")
})