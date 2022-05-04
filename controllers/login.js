// npm install express and Node

var express = require("express");
var app = express();
app.path = require("path");
const router =  express.Router();

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
const assignment = require('../models/schema.js');

const logindata=require('../models/loginschema.js');




//login page
router.get('/login',function(req,res){
    res.sendFile(path.resolve("template/pages/samples/login.html"));
});

//signup page
router.get('/signup',function(req,res){
    res.sendFile(path.resolve("template/pages/samples/register.html"));
});

router.get('/terms',function(req,res){
    res.sendFile(path.resolve('template/pages/samples/terms.html'));
});


router.post('/logindata',function(req,res){
    session=req.session;
    //console.log(req.body);
    assignment.findOne({email:req.body.email,password:req.body.password},function(err,docs){
        if(err || docs==null)
        {
            //console.log(err)
            res.sendStatus(500);
        }
        else{
           session.user=docs;


            res.send(docs);
        }
    })
});

module.exports=router;
