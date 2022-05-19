const express = require('express')
const app = express()
const port = process.env.PORT || 4000

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`port is running ${port}`)
})


//applestore
//RkGfDv8lGf3Hgvfp3