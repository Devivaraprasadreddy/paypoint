// npm install express and Node

var express = require("express");
var app = express();
app.path = require("path");

// npm install express-session

//sessions
 
var sessions = require('express-session')

app.use(
  sessions({
      cookieName: "sessions",
      secret: "blargadeeblargblarg",
      saveUninitialized: true,
      resave: false,
  })  
);

var session;


app.use(express.json());
app.use(express.urlencoded({extended:false}));

// app.use(express.static("contents"));
var path = require('path')



//css path creation 

app.use(express.static(path.join(__dirname, 'assets')));
app.use(express.static(path.join(__dirname, '')));
app.use(express.static(path.join(__dirname, 'template')));
app.use(express.static(path.join(__dirname, 'template/assets/css/style.css')));
app.use(express.static(path.join(__dirname, 'template/pages/samples')));


// Mongodb Database Connection

const mongoose = require("mongoose");


// const { Transaction } = require("mongodb");

//mongoDB database url
mongoose.connect("mongodb+srv://devivaraprasad:dsp9391@cluster0.syjej.mongodb.net/capstoneproject?retryWrites=true&w=majority",{
    useUnifiedTopology : true,
    useNewUrlParser : true,
}).then(()=>{
    console.log("mongoose connected" );
}).catch((e)=>{
    console.log("Not Connected to MongoDb Database");
});
const connection=mongoose.connection;


//calling the all schemas
const assignment = require('./models/schema.js');
const Transaction=require('./models/Transaction_Schema.js');
const usercapstone=require('./models/user_Schema.js');
const Loyality_Transaction=require('./models/Loyality_Schema.js');
const logindata=require('./models/loginschema.js');
const admindata=require('./models/admin_Schema.js');
const cash = require('./models/cash_schema.js');
const review = require('./models/review_schema.js');
const contact = require('./models/contact_Schema.js');




//Controllers
const loginrouter = require("./controllers/login.js");
app.use('/' , loginrouter);

const userrouter = require('./controllers/user.js');
app.use('/', userrouter);

const adminrouter = require('./controllers/admin.js');
app.use('/', adminrouter)





//it is running in localhost server
app.listen(3000, ()=> console.log("Successfully Server Started at 3000!"));