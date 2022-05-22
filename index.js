const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 4000;
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

const uri = "mongodb+srv://applestore:RkGfDv8lGf3Hgvfp3@cluster0.tbjp1.mongodb.net/?retryWrites=true&w=majority";
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
        })
        //get user product
        app.get('/myitem/:email', async (req, res) => {
            const email = req.params.email;
            // console.log(email);
            const query = { email: email }
            const result = await appleStoreCollection.find(query).toArray();
            res.send(result)
        })




        app.get('/product', async (req, res) => {
            const decodedEmail = req.decoded.email
            const email = req.query.email;
            const query = { email: email }
            const cursor = appleStoreCollection.find(query);
            const order = await cursor.toArray();
            res.send(order)


        })
        //post products
        app.post('/products', async (req, res) => {
            const newProduct = req.body;
            console.log(newProduct);
            const result = await appleStoreCollection.insertOne(newProduct)
            res.send({ success: "product add successfully" })
            // const tokenInfo = req.headers.authorization;

            // const [email, accesstoken] = tokenInfo.split(" ")
            // const decoded = verfyToken(accesstoken)
            // if (email !== decoded.email) {
            //     res.send({ success: "unAuthorized user" })

            // }
            // else {
            //     const result = await appleStoreCollection.insertOne(newProduct)
            //     res.send({ success: "product add successfully" })

            // }
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
            const result = await appleStoreCollection.updateOne(filter, updatePro, option);
            res.send(result)
        })

        //delete 
        app.delete('/products/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) }
            // const query = {_id: ObjectId(id)}
            const result = await appleStoreCollection.deleteOne(query);
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