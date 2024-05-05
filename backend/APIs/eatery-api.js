const exp = require("express")
const eateryApp = exp.Router()

const { createClientOrEatery, clientOrEateryLogin } = require('./Util')
const expressAsyncHandler = require('express-async-handler')
const verifyToken = require('../Middlewares/verifyToken')

let eateriesCollection;
let foodsCollection;
let ordersCollection;

eateryApp.use((req, res, next) => {
    eateriesCollection = req.app.get('clientsCollection')
    ordersCollection = req.app.get('ordersCollection')
    foodsCollection = req.app.get('foodsCollection')
    next()
})

//eatery creation
eateryApp.post('/eatery-reg', expressAsyncHandler(createClientOrEatery))

//eatery login
eateryApp.post('/login', expressAsyncHandler(clientOrEateryLogin))

//add food
eateryApp.post('/new-food', verifyToken,expressAsyncHandler(async (req, res) => {
    const newfood = req.body
    const checkfood = await foodsCollection.findOne({$and:[{ foodname: newfood.foodname}, {eateryname : newfood.eateryname}]})

    if (checkfood !== null) {
        res.send({ message: "food already exists" })
    }
    else {
        await foodsCollection.insertOne(newfood)
        res.send({ message: "new food added" })
    }

}))

//edit food
eateryApp.put('/food' , verifyToken,(async(req , res) => {
    const modfood = req.body
    let aftermodfood = await foodsCollection.findOneAndUpdate({foodid : modfood.foodid},{$set:{...modfood}},{returnDocument : 'after'})
    res.send({message : "food modified" , payload : aftermodfood})
}))

//delete food
eateryApp.put('/food/:id' , verifyToken,expressAsyncHandler(async(req , res) => {
    const getid = req.params.id
    await foodsCollection.updateOne({foodid : getid} , {$set:{status : false}})
    res.send({message : "Food Item successfully deleted"})
}))

//get all orders 
eateryApp.get('/orders/:name' , verifyToken,expressAsyncHandler(async(req, res) => {
    const getname = req.params.name
    const getorders = await ordersCollection.find({eateryname : getname}).toArray()

    getorders.forEach((order) => delete order.clientname)
    
    res.send({message : "All orders for eatery" , payload : getorders})
}))

// complete the order
eateryApp.put('/order/:id' , verifyToken,expressAsyncHandler(async(req, res) => {
    const getid = req.params.id
    await ordersCollection.updateOne({orderid : getid}, {$set : {status : true}})
}))

module.exports = eateryApp