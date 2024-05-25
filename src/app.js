// These modules are required for this project
const express = require('express');
const Subscriber = require('./models/subscribers');
const path = require('path');


const app = express();

/* Here we are setting up the middleware. A middleware can be used for many purpose, like we have to execute some code before sending the main response,
 or we can use middleware in authorization. We create middleware using app.use() method.*/

app.use(express.json())
app.use(express.urlencoded({ extended: true }));

// Here we are using this middleware to serve static files from the 'public' directory
app.use(express.static('public'));

// This get Route to serve the index.html file means it will open the main page of this application.
app.get('/', (req, res)=>{
    res.status(200).sendFile(path.join(__dirname, "/index.html"));
});


// This is the subscriber endpoint. When a request come to this endpoint then this endpoint provide you the all information of subscribers.
app.get('/subscribers',async(req,res)=>{
    try{
        let subscribers = await Subscriber.find();               // Fetch all subscribers
        res.status(200).send(subscribers);
    }
    catch(err){
        res.status(500).send(err);
    }    
});

// When a get request with this Route (/subscriber/names), It will provide you names and subscribed channels of subscribers

app.get('/subscribers/names',async(req,res)=>{
    try{
        let subscribers = await Subscriber.find(
            {},                                                 
            { name: 1, subscribedChannel: 1, _id: 0 }   // Here you can se 1 and 0=>  1 means field we want to inlude  and 0 for field we want to exclude in result.
        );
        res.status(200).send(subscribers); 
    }
    catch(err){
        res.status(500).send(err);
    }
});

/* This endpoint helped you to fetch data of a Subscriber. You can find a subscriber by putting his/her id in input. If id not macth in databse it will show you
No Subscriber found in  this id. */

app.get('/subscribers/:id',async (req, res)=>{
    try{                                                                   
        let subscribers = await Subscriber.findById(req.params.id);
        // Response data
        res.status(200).send(subscribers);
    }
    catch(err) {                          
        res.status(400).send({Error_message : "No Subscriber found in  this id"});
    }
});


module.exports = app;
