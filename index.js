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
        await client.connect()
        const appleStoreCollection = client.db('appleStore').collection('serviceProducts')
        //get all post item and shaow all
        app.get('/products', async (req, res) => {
            const cursor = appleStoreCollection.find({});
            const result = await cursor.toArray()
            res.send(result)
        })
        // get specific item 
        app.get('/products/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) }
            const result = await appleStoreCollection.findOne(query);
            res.send(result)
            console.log("loaded");
        })
        app.get('/product', verifyJWT, async (req, res) => {
            const decodedEmail = req.decoded.email
            const email = req.query.email;
            if (email === decodedEmail) {
                const query = { email: email }
                const cursor = appleStoreCollection.find(query);
                const order = await cursor.toArray();
                res.send(order)
            }
            else {
                res.status(403).send({ message: "forbiden access" })
            }
        })
        //post products
        app.post('/products', async (req, res) => {
            const newProduct = req.body;
            const tokenInfo = req.headers.authorization;

            const [email, accesstoken] = tokenInfo.split(" ")
            const decoded = verfyToken(accesstoken)
            if (email !== decoded.email) {
                res.send({ success: "unAuthorized user" })

            }
            else {
                const result = await mackbookCollection.insertOne(newProduct)
                res.send({ success: "product add successfully" })

            }
        })
        // Update quantity
        app.put('/products/:id', async (req, res) => {
            const id = req.params.id;
            console.log(id);
            const quantity = req.body.updatequantity;
            console.log(quantity);
            console.log(quantity);
            const filter = { _id: ObjectId(id) }
            const option = { upsert: true };
            const updatePro = {
                $set: {
                    quantity
                }
            }
            const result = await mackbookCollection.updateOne(filter, updatePro, option);
            res.send(result)
        })
        //delete 
        app.delete('/products/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) }
            const result = await mackbookCollection.deleteOne(query);
            res.send(result)
        })
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