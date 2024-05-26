
# GetYouTubeSubscriber Backend Project

# Description

This Node.js application serves as a pivotal platform for effectively managing YouTube subscribers. Utilizing MongoDB for robust data storage and employing Express.js and Mongoose ensures seamless backend operations. Furthermore, the application has been globally deployed via the Render platform, ensuring widespread accessibility and adept handling of surges in traffic. The live webpage boasts an intuitive interface, enhancing user experience by simplifying navigation and interaction with the array of available API endpoints

![Home page](https://github.com/MOHAMMADAQEEL8859/GetYoutubeSubscribers/assets/123291892/2ab06194-a135-4f69-8ea9-aee237432085)




## Installation

Install my-project using these simple steps

1. Clone this repo
2. Install Dependencies using npm Install.
3. Ensure MongoDb is installed and running in your system.
4. In terminal rout to path to run these files Exucete these   files in same way.

   (i) - GetYouTubeSubscribers\src>node createDatabase.js

   (ii) - GetYouTubeSubscribers\src>node index.js

5. After executing these file type http://localhost:3000/ in your browser and hit enter key.
    
## API Reference

#### Get Home page

Type this in your browser screen http://localhost:3000/ to send the request to fetch the home page or gui of application.

app.get('/', (req, res)=>{
    res.status(200).sendFile(path.join(__dirname, "/index.html"));
});

#### Get All Subscribers

In This API there we created an endpoin /subscribers this API will called by hitting get button or typing http://localhost:3000/subscribers


app.get('/subscribers',async(req,res)=>{
    try{
        let subscribers = await Subscriber.find();               
        res.status(200).send(subscribers);
    }
    catch(err){
        res.status(500).send(err);
    }    
});

#### To fetch the subscribers name and their subscribed channel

This API will help you to find only two fields

You can call this By Hitting get button or typing http://localhost:3000/subscribers/names



#### To fetch a particular subscriber by using id

This API helps you to find a particular subscriber by putting id in the API call. This provide you only that subscriber which using that id. If id does not match its provide you not found.

we can call this API by hitting get button or typing http://localhost:3000/subscribers/:id

note--> replace :id with the id you want to check

example id --> 6651c4370f33002e7c79f1b4


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



## Deployment

1. To deploy this project or run this project

You can run this project by clicking this link no need to clone the repository 

link - https://getyoutubesubscribers-wpk9.onrender.com

This project deployed on render.com. rendor.com provides cloud services here you can deploy your codes and project from Deploy from GitHub / GitLab / Bitbucket

2. We are using MongoDb Atlas for data operation like store, manage.

3. If you want to use local MongoDb databse change the database url in sorce code.







## Technology used

1. Node.js
2. MongoDB
3. Mongoose
4. Express
