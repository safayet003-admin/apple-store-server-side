const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 4000;


//middleware
app.use(cors());
app.use(express.json())

//applestore
//RkGfDv8lGf3Hgvfp3

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`port is running ${port}`)
})