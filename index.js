const express = require('express');
const app = express();
const cors = require('cors');
const mongodb = require('mongodb');
const mongoClient = mongodb.MongoClient;

const url = "mongodb+srv://sridharrajaram:mdBsb@dmin@cluster0.eejhy.mongodb.net?retryWrites=true&w=majority"

const PORT = process.env.PORT || 3001

// to avoid cors error
app.use(cors({
    Origin: "*"
}))

//express.json() middleware will extract the body from request and store it in req.body variable
app.use(express.json()) 

/****User Section********/

app.get("/users",async function(req,res){

    // mongodb Database concept introduced
    try {
        //connect the database
        let client = await mongoClient.connect(url) //since it is returning the promise, we are puting in try catch async

        //select the db
        let db = client.db("sbadmin")

        //select the collection and perform the action
        let data = await db.collection("users").find().toArray() //returning the promise we put await, cursor pointer, so toArray

        //close the database
        await client.close();

        res.json(data) //reply with data

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "something went wrong"
        })
    }
    
})

app.post("/create-user",async function(req, res){

    // mongodb Database concept introduced
    try {
        //connect the database
        let client = await mongoClient.connect(url) //since it is returning the promise, we are puting in try catch async

        //select the db
        let db = client.db("sbadmin")

        //select the collection and perform the action
        let data = await db.collection("users")
                            .insertOne(req.body) //since it is returning the promise we put await

        //close the database
        await client.close();

        res.json({
            message: "user added sucessfully"
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "something went wrong"
        })
    }
    
})

app.get("/users/:id",async function(req,res){
    
    // mongodb Database concept introduced
    try {
        //connect the database
        let client = await mongoClient.connect(url) 

        //select the db
        let db = client.db("sbadmin")

        //select the collection and perform the action
        let data = await db.collection("users")
                            .findOne({_id: mongodb.ObjectId(req.params.id)})

        //close the database
        await client.close();

        res.json(data) //reply with data

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "something went wrong"
        })
    }

})

app.put("/update-user/:id",async function(req,res){
    
    // mongodb Database concept introduced
    try {
        //connect the database
        let client = await mongoClient.connect(url) 

        //select the db
        let db = client.db("sbadmin")

        //select the collection and perform the action
        let data = await db.collection("users")
                        .findOneAndUpdate({ _id: mongodb.ObjectId(req.params.id) }, { $set: req.body })

        //close the database
        await client.close();

        res.json({
            message: "User's data updated sucessfully"
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "something went wrong"
        })
    }

})

app.delete("/delete-user/:id",async function(req,res){
    
    // mongodb Database concept introduced
    try {
        //connect the database
        let client = await mongoClient.connect(url) 

        //select the db
        let db = client.db("sbadmin")

        //select the collection and perform the action
        let data = await db.collection("users")
                        .findOneAndDelete({ _id: mongodb.ObjectId(req.params.id) })

        //close the database
        await client.close();

        res.json({
            message: "User deleted sucessfully"
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "something went wrong"
        })
    }

})


/*****Product Section******* */

app.get("/products",async function(req,res){
    
    // mongodb Database concept introduced
    try {
        //connect the database
        let client = await mongoClient.connect(url) 

        //select the db
        let db = client.db("sbadmin")

        //select the collection and perform the action
        let data = await db.collection("products").find().toArray()

        //close the database
        await client.close();

        res.json(data) //reply with data

    } catch (error) {
        res.status(500).json({
            message: "something went wrong"
        })
    }

})

app.post("/create-product",async function(req, res){
    
    // mongodb Database concept introduced
    try {
        //connect the database
        let client = await mongoClient.connect(url)

        //select the db
        let db = client.db("sbadmin")

        //select the collection and perform the action
        let data = await db.collection("products")
                            .insertOne(req.body)
                            
        //close the database
        await client.close();

        res.json({
            message: "product added sucessfully"
        })
    } catch (error) {
        res.status(500).json({
            message: "something went wrong"
        })
    }

})

app.get("/products/:id",async function(req,res){

    // mongodb Database concept introduced
    try {
        //connect the database
        let client = await mongoClient.connect(url)

        //select the db
        let db = client.db("sbadmin")

        //select the collection and perform the action
        let data = await db.collection("products")
                            .findOne({_id: mongodb.ObjectId(req.params.id)})

        //close the database
        await client.close();

        res.json(data) //reply with data

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "something went wrong"
        })
    }

})

app.put("/update-product/:id",async function(req,res){
    
    // mongodb Database concept introduced
    try {
        //connect the database
        let client = await mongoClient.connect(url) 

        //select the db
        let db = client.db("sbadmin")

        //select the collection and perform the action
        let data = await db.collection("products")
                        .findOneAndUpdate({ _id: mongodb.ObjectId(req.params.id) }, { $set: req.body })

        //close the database
        await client.close();

        res.json({
            message: "Products updated sucessfully"
        })
    } catch (error) {
        res.status(500).json({
            message: "something went wrong"
        })
    }

})

app.delete("/delete-product/:id",async function(req,res){
    
    // mongodb Database concept introduced
    try {
        //connect the database
        let client = await mongoClient.connect(url)

        //select the db
        let db = client.db("sbadmin")

        //select the collection and perform the action
        let data = await db.collection("products")
                        .findOneAndDelete({ _id: mongodb.ObjectId(req.params.id) })

        //close the database
        await client.close();

        res.json({
            message: "Product deleted sucessfully"
        })
    } catch (error) {
        res.status(500).json({
            message: "something went wrong"
        })
    }

})

app.listen(PORT,function(req,res){
    console.log(`the app is listening in port ${PORT}`)
})