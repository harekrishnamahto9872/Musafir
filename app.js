const express = require('express')
const mongodb = require('mongodb')
const appController = require('./Controllers/appController')

const app = express()
//const PORT = 3000
//const URL = '127.0.0.1'
const port = process.env.PORT || 3000;
//app.use(body.json())
app.set('view engine', 'ejs')
app.use(express.static('public'));

const uri = "mongodb+srv://hare123:hare123@myfirstcluster-ixxfb.mongodb.net/test?retryWrites=true&w=majority"

mongodb.MongoClient.connect(uri,(err,dbClient) =>{
    if(err)
    {
        console.log("error connecting to database ",err)
    }
    else
    {
        console.log("Connection to database successful!!")
        const database = dbClient.db('userDetails')
        appController(app,database)
    }

    app.listen(port,()=>{
        console.log(`Listening to server at ${port}`);
    })
    
})


