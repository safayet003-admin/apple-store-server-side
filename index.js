const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 4000;
const { MongoClient, ServerApiVersion } = require('mongodb');

//middleware
app.use(cors());
app.use(express.json())

const uri = "mongodb+srv://${process.env.DB_USER}:{process.env.DB_PASS}@cluster0.tbjp1.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run() {
    try {

    }
    finally {

    }
}
run().catch(console.dir)
/* 

client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});
 */

app.get('/', (req, res) => {
    res.send('Apples Store')
})

app.listen(port, () => {
    console.log(`port is running ${port}`)
})