// Import required modules
const express = require('express');
const Subscriber = require('./models/subscribers');
const path = require('path');


const app = express();

// Middleware setup

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
// Serve static files from the 'public' directory
app.use(express.static('public'));

// Route to serve the index.html file
app.get('/', (req, res)=>{
    res.status(200).sendFile(path.join(__dirname, "/index.html"));
});


// Route to get all subscribers
app.get('/subscribers',async(req,res)=>{
    try{
        let subscribers = await Subscriber.find();               // Fetch all subscribers
        res.status(200).send(subscribers);
    }
    catch(err){
        res.status(500).send(err);
    }    
});

// Route to get only names and subscribed channels of subscribers
app.get('/subscribers/names',async(req,res)=>{
    try{
        let subscribers = await Subscriber.find(
            {}, 
            { name: 1, subscribedChannel: 1, _id: 0 }           // Fetch subscribers with only name and subscribedChannel fields
        );
        res.status(200).send(subscribers); 
    }
    catch(err){
        res.status(500).send(err);
    }
});

// Route to get a subscriber by ID
app.get('/subscribers/:id',async (req, res)=>{
    try{                                                                   //fetch data of a subscriber with subscriber ID
        let subscribers = await Subscriber.findById(req.params.id);
        // Response data
        res.status(200).send(subscribers);
    }
    catch(err) {                               // Handle invalid ID error
        res.status(400).send({Error_message : "No Subscriber found in  this id"});
    }
});


module.exports = app;
