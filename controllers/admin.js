// npm install express and Node

var express = require("express");
var app = express();
app.path = require("path");

const router = express.Router();
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



//calling the Schema

const admindata=require('../models/admin_Schema.js');



router.get('/adminlogin',function(req,res){
    res.sendFile(path.resolve("template/pages/samples/admin login.html"));
});


//admin dashboard

router.get('/usertables',function(req,res){
    res.sendFile(path.resolve('template/pages/tables/basic-table.html'));
});

router.get('/charts',function(req,res){
    res.sendFile(path.resolve('template/pages/charts/chartjs.html'));
});

router.get('/admin/dashboard',function(req,res){
    res.sendFile(path.resolve('template/pages/samples/adminpannel.html'));
});






router.get('/admin',function(req,res){
    // res.sendFile(path.resolve'/template/pages/samples/adminpannel.html');
    session = req.session;
    if(session.user){
        console.log(session.user)
        res.sendFile(path.resolve('template/pages/samples/adminpannel.html'));
    }
    else{
        res.redirect('/adminlogin');
    }
})

router.get('/adminlogout',function(req,res){
    req.session.destroy();
    res.redirect('/adminlogin');
})

//post the admin data to database
router.post('/admindata',function(req,res){
    console.log(req.body);
    session=req.session;
    admindata.findOne({email:req.body.email,password:req.body.password},function(err,docs){
        if(err || docs==null)
        {
            res.sendStatus(500);
        }
        else{
            
            session.user=docs;

            res.send(docs);
        }
    })
});
module.exports=router;

