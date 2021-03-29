// import password from '.env'

const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser')
const express = require('express')
const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
})
const password = 'iXYS6zJhx$8PUCp'

const uri = "mongodb+srv://organicSoup:iXYS6zJhx$8PUCp@raufuprezensinc.hztjo.mongodb.net/organicdb?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

app.get('/', (req, res) => {
    res.send('Working!')
})

client.connect(err => {
    const productCollection = client.db("organicdb").collection("products");

    app.get('/products', (req, res) => {
        productCollection.find({})
            .toArray((err, documents) => {
                res.send(documents);
            })
    })

    app.post('/addProduct', (req, res) => {
        const product = req.body;
        productCollection.insertOne(product)
            .then(result => {
                console.log("Success")
                res.send("Soup Added Successfully!")
            })
    })

    console.log("Database Connected")

});

app.listen(3000)