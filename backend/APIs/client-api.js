const exp = require("express")
const clientApp = exp.Router()

const { createClientOrEatery, clientOrEateryLogin } = require('./Util')
const expressAsyncHandler = require('express-async-handler')
const verifyToken = require('../Middlewares/verifyToken')

let clientsCollection;
let foodsCollection;
let ordersCollection;
let cartCollection

clientApp.use((req, res, next) => {
    clientsCollection = req.app.get('clientsCollection')
    ordersCollection = req.app.get('ordersCollection')
    foodsCollection = req.app.get('foodsCollection')
    cartCollection = req.app.get('cartCollection')
    next()
})

//client creation
clientApp.post('/client-reg', expressAsyncHandler(createClientOrEatery))

//client login
clientApp.post('/login', expressAsyncHandler(clientOrEateryLogin))

//add to cart
clientApp.post('/cart/:name', verifyToken, expressAsyncHandler(async (req, res) => {
    const getname = req.params.name
    const getitem = req.body;
    const cartdata = await cartCollection.findOne({ clientname: getname })

    if (cartdata.eateryname !== null) {
        if (cartdata.eateryname === getitem.eateryname) {
            await cartCollection.updateOne({ clientname: getname }, { $addToSet: { cartItems: getitem.fooddata } })
        }
        else {
            res.send({ message: "Food can be added to cart if they all are of the same eatery" })
        }
    }
    else {
        await cartCollection.findOneAndUpdate({ clientname: getname }, { $set: { eateryname: getitem.eateryname } })

        await cartCollection.updateOne({ clientname: getname }, { $addToSet: { cartItems: getitem.fooddata } })
    }

    res.send({ message: "Item added to cart", payload: getitem })

}))

//read cart items
clientApp.get('/all-cart/:name', verifyToken, expressAsyncHandler(async (req, res) => {
    const getname = req.params.name
    const cartdata = await cartCollection.findOne({ clientname: getname })

    res.send({ message: "Items in the cart", payload: cartdata.cartItems })

}))

//modify cart
clientApp.post('/ed-cart/:id/:name', verifyToken, expressAsyncHandler(async (req, res) => {
    const getid = (req.params.id)
    const getname = req.params.name

    const getfood = req.body

    await cartCollection.findOneAndUpdate(
        { clientname: getname, "cartItems.foodid": getid },
        { $set: { "cartItems.$": getfood } })

    res.send({ message: "Food Item modified in the cart" })
}))

//delete cart item
clientApp.delete('/cart/:foodid', verifyToken, expressAsyncHandler(async (req, res) => {
    const getid = (+req.params.foodid)

    const getfood = req.body

    const getcart = await cartCollection.findOne({ clientname: getfood.clientname })

    const getitems = await getcart.cartItems.filter((fooditem) => fooditem.foodid != getid)

    if (getitems.length !== 0) {
        await cartCollection.findOneAndUpdate({ clientname: getfood.clientname }, { $set: { cartItems: getitems } })
    }
    else {
        await cartCollection.findOneAndUpdate({ clientname: getfood.clientname }, { $set: { cartItems: [], eateryname: null } })
    }
    res.send({ message: "Food Item removed from cart" })

}))


//place order successfully
clientApp.post('/order/:name', verifyToken, expressAsyncHandler(async (req, res) => {
    const getname = req.params.name
    const getbody = req.body

    const getcart = await cartCollection.findOne({ clientname: getname })

    if (getcart.cartItems !== null) {
        getbody.eateryname = getcart.eateryname
        getbody.items = getcart.cartItems

        // add client name
        getbody.clientname = getname
        //calculate cost
        getbody.totalCost = getcart.cartItems.reduce((acc, cartItem) => acc + cartItem.foodcost, 0)
        //delete(Hard) items in the cart
        await cartCollection.findOneAndUpdate({ clientname: getname }, { $set: { cartItems: [], eateryname: null } })
        //put status = false
        getbody.status = false

        await ordersCollection.insertOne(getbody)
        res.send({ message: "Order successfully placed", payload: getbody })
    }
    else {
        res.send({ meassage: "Cart items are empty" })
    }



}))

//get all orders for client
clientApp.get('/orders/:name', verifyToken, expressAsyncHandler(async (req, res) => {
    const getname = req.params.name
    const getorders = await ordersCollection.find({ clientname: getname }).toArray()
    res.send({ message: "All orders for client", payload: getorders })
}))


module.exports = clientApp