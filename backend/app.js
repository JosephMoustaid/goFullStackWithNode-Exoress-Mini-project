/* MongoDB 
username : youssefmoustaid
password : z8FrxVctRxaEtp9X
Conncetion Driver : mongodb+srv://youssefmoustaid:z8FrxVctRxaEtp9X@cluster0.iw1j9.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
*/
// importing the express module
const express = require("express") ;

const mongoose = require("mongoose");

const stufRoutes = require("./routes/stuff");
const userRoutes = require("./routes/user");

const app = express();

// connection to the Mongo.db cluster
mongoose.connect("mongodb+srv://youssefmoustaid:z8FrxVctRxaEtp9X@cluster0.iw1j9.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0").then(()=>{
    console.log("successfully connected to MongoDB Atlas");
    }).catch((error)=>{  // one of the possible errors is that if the IP address that is linked to Mongo DB atlas of your device has changed 
    console.log("Uncble to connect to MongoDB Atlas");
    console.error();
})

app.use(express.json());

//app.use(bodyParser.json());
// middleware : middleware receives the request and response objects and can read, parse, and manipulate them as necessary. 
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use('/api/stuff',stufRoutes);
app.use('/api/auth',userRoutes)

module.exports = app;
/*
request statuses:
    200 : OK - The request was successful.
    201 : Created - The request was successful, and a new resource was created as a result.
*/
