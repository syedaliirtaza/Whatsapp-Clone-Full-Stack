const express = require("express");
const mongoose = require("mongoose");
const Pusher = require("pusher");
const cors = require("cors");

//app config
const app = express();
const port = process.env.PORT || 9000;

//pusher
const pusher = new Pusher({
    appId: "Your pusher appID",
    key: "pusher key",
    secret: "Secret",
    cluster: "cluster name",
    useTLS: 
});

//middleware
app.use(express.json());

//cors headers to allow the req to come from any endpoint
app.use(cors());
  
//connecting to mongodb
mongoose.connect("Your mongo db url",
{ 
    useNewUrlParser: true,
});

//dbmessages
// creating a new schema

const whatsappSchema = new mongoose.Schema({
    message: String,
    name: String,
    timestamp: String,
    recieved: Boolean
});

// creating a new model 

const Messagecontent = new mongoose.model("Messagecontent", whatsappSchema);

// checking the db connection
const db = mongoose.connection;

// once db is connected
db.once("open", function(){
    console.log("Database Connected");

    //watching the change
    const msgCollection = db.collection("messagecontents");
    const changeStream = msgCollection.watch();

    
    // trigger a function when smth is change occured
    changeStream.on("change", function(change){
        console.log("A change occurred", change);

        //trigger the pusher here
        if (change.operationType === "insert") {
            const messageDetails = change.fullDocument;
            pusher.trigger("messagecontents","inserted",{
                name: messageDetails.name,
                message: messageDetails.message,
                timestamp: messageDetails.timestamp,
                received : messageDetails.received
            });
        } else {
            console.log("Error triggering Pusher");
        }
    })
});

// creating an api route which we will be using for messages
//starting route
app.get("/", function(req,res){
    res.send("hello")
});

// getting the data from database using get req
app.get("/messages/sync", function(req,res){
    Messagecontent.find({}, function(err, foundData){
        if(err){
            res.send(err);
        } else {
            res.send(foundData);
        }
    });
});

//creating a new document using post req
app.post('/messages/new', function(req, res){
    const dbMessage = req.body;
    // console.log(dbMessage);
    const message = new Messagecontent(dbMessage,function(err, message){
        if(err){
            res.send(err);
        } else {
            res.send(`new message created: \n ${message}`)
        }
    });
    message.save();
});


//listening port
app.listen(port, function(){
    console.log(`server is running on localhost:${port}`);
});