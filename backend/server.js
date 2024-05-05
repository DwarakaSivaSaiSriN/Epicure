const exp = require("express")
const app = exp()

const path = require("path")

require("dotenv").config()

app.use(exp.json())


app.use(exp.static(path.join(__dirname , '../frontend/build')))

const mongoClient = require("mongodb").MongoClient

mongoClient
    .connect(process.env.DB_URL)
    .then((client) => {

        // get required database
        const epicureDBobj = client.db("epicuredb");

        //get collections
        const clientsCollection = epicureDBobj.collection("clients")
        const eateriesCollection = epicureDBobj.collection("eateries")
        const foodsCollection = epicureDBobj.collection("foods")
        const ordersCollection = epicureDBobj.collection("orders")
        const cartCollection = epicureDBobj.collection("cart")

        //store the collections in our "app" to share with APIs
        app.set("clientsCollection", clientsCollection)
        app.set("eateriesCollection", eateriesCollection)
        app.set("foodsCollection", foodsCollection)
        app.set("ordersCollection", ordersCollection)
        app.set("cartCollection", cartCollection)

        console.log("DB connection success")
    })
    .catch((err) => {
        console.log("Err in DB connect", err);
    });

const clientApp = require("./APIs/client-api");
const eateryApp = require("./APIs/eatery-api");

app.use('/client-api', clientApp);
app.use('/eatery-api', eateryApp);

// app.use((req , res, next) => {
//     res.sendFile(path.join(__dirname , '../frontend/build/index.html'))
// })

app.use((err, req, res, next) => {
    res.send({ status: "error", message: err.message })
});

const port = process.env.PORT || 4000

app.listen(port, () => console.log(`http server on port ${port}`))