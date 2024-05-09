const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const createClientOrEatery = async (req, res) => {

    const clientsCollectionObj = req.app.get('clientsCollection')
    const eateriesCollectionObj = req.app.get('eateriesCollection')
    const cartCollectionObj = req.app.get('cartCollection')

    const clientCred = req.body

    if (clientCred.clientType == 'client') {

        let dbclient = await clientsCollectionObj.findOne({ clientName: clientCred.clientName })

        if (dbclient !== null) {
            return res.send({ message: "Client already exists" })
        }
    }

    if (clientCred.clientType == 'eatery') {

        let dbclient = await eateriesCollectionObj.findOne({ eateryName: clientCred.eateryName })

        if (dbclient !== null) {
            return res.send({ message: "Eatery already exists" })
        }
    }

    const hashedPassword = await bcryptjs.hash(clientCred.password, 8)
    clientCred.password = hashedPassword

    if (clientCred.clientType === 'client') {
        await clientsCollectionObj.insertOne(clientCred)
        await cartCollectionObj.insertOne({ clientName: clientCred.clientName, eateryName: null, cartItems: [] })
        res.send({ message: "A Client created" })
    }

    if (clientCred.clientType === 'eatery') {
        await eateriesCollectionObj.insertOne(clientCred)
        res.send({ message: "An Eatery created" })
    }
}

const clientOrEateryLogin = async (req, res) => {
    const clientsCollectionObj = req.app.get("clientsCollection")
    const eateriesCollectionObj = req.app.get("eateriesCollection")

    const clientCred = req.body

    //client
    if (clientCred.clientType === 'client') {

        let dbclient = await clientsCollectionObj.findOne({ clientName: clientCred.clientName })

        if (dbclient == null) {
            return res.send({ message: "Invalid clientName" })
        } else {
            let status = await bcryptjs.compare(clientCred.password, dbclient.password)

            if (status === false) {
                return res.send({ message: "Invalid password" })
            } else {
                const signedToken = jwt.sign({ clientName: dbclient.clientname }, process.env.SECRET_KEY, { expiresIn: '1h' })
                delete dbclient.password
                res.send({ message: "login success", token: signedToken, client: dbclient })
            }
        }
    }

    //eatery
    if (clientCred.clientType === 'eatery') {
        let dbclient = await eateriesCollectionObj.findOne({ eateryName: clientCred.eateryName })

        if (dbclient === null) {
            return res.send({ message: "Invalid eatery name" })
        } else {
            let status = await bcryptjs.compare(clientCred.password, dbclient.password)
            if (status === false) {
                return res.send({ message: "Invalid password" })
            } else {
                const signedToken = jwt.sign({ eateryName: dbclient.eateryName }, process.env.SECRET_KEY, { expiresIn: '1h' })
                delete dbclient.password
                res.send({ message: "login success", token: signedToken, client: dbclient })
            }
        }
    }

}



module.exports = { createClientOrEatery, clientOrEateryLogin }