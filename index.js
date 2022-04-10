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


//post the data to database 

app.post('/sendData',function(req,res){
    //res.sendFile(__dirname + '/pages/sample.html');
    console.log(req.body);
    //res.send(req.body);
    var obj = new assignment({
        name:req.body.name,
        email:req.body.email,
        number:req.body.number,
        password:req.body.password,
        cpassword:req.body.cpassword,
    })
    assignment.findOne({email:req.body.email}, function(err,docs){
        if(err || docs==null){
            console.log(err)
            obj.save(function(err, results) {
                if(results){
                   console.log("results"+ results);
                    res.send(results);
                }else{
                    console.log(err)
                    res.send(err);
                }
            })
        }
        else{
            res.sendStatus(500)
        }
    })
   
});

//login checking

//post the data to database

app.post('/logindata',function(req,res){
    //console.log(req.body);
    assignment.findOne({email:req.body.email,password:req.body.password},function(err,docs){
        if(err || docs==null)
        {
            //console.log(err)
            res.sendStatus(500);
        }
        else{
            req.session.users = docs;
            res.send(docs);
        }
    })
});

//post the admin data to database
app.post('/admindata',function(req,res){
    console.log(req.body);
    admindata.findOne({email:req.body.email,password:req.body.password},function(err,docs){
        if(err || docs==null)
        {
            res.sendStatus(500);
        }
        else{
            res.send(docs);
        }
    })
});


//to get the user data in database
app.get('/getassignmentdata',(req,res)=>{
    assignmentdata.find(function(err,result){
        if(err||result==null)
        {
            console.log(err);
        }
        else if(result!=undefined){
            console.log(result);
            res.send(result);

        }
    })
});




// app.post('/deletedatabyid',(req,res)=>{
//     //res.sendFile(__dirname + '/pages/sample.html');
//     //console.log(req.body);
//     //res.send(req.body);
    
//     // obj.save(function (err, results) {
//     //     if(results){
//     //        console.log(results);
//     //         res.send(results);
//     //     }else{
//     //         res.send(err);
//     //     }
//     // })
//     Sample.findOneAndRemove({_id: req.body.id}, req.body, function(err,results)
// {
//     if(!err){
//         console.log("Deleted");
//     }else{
//         res.send(results)
//     }
// });


// });


// app.get('/getassignmentdata',(req,res)=>{
// assignment.find(function(err,result){
//         if(err || result==null)
//         {
            
//             console.log(err)
//         }
//         else if(result!=undefined)
//         {
            
//             console.log(result)
//             res.send(result);
//         }
//     })
// });




 


// Dashboard page
//frontend pages js
app.get("/", function(req,res){
    res.sendFile(__dirname + "/index2.html");
});

//login page
app.get('/login',function(req,res){
    res.sendFile(__dirname + "/template/pages/samples/login.html");
});

//signup page
app.get('/signup',function(req,res){
    res.sendFile(__dirname + "/template/pages/samples/register.html");
});

//admin login page
app.get('/adminlogin',function(req,res){
    res.sendFile(__dirname + "/template/pages/samples/admin login.html");
});

//terms and conditions page
app.get('/terms',function(req,res){
    res.sendFile(__dirname + '/template/pages/samples/terms.html');
});

//home page
app.get('/home',function(req,res){
    session = req.session;
    if(session.users){
        res.sendFile(__dirname+'/index.html');
    }else{
        res.redirect("/login");
    }
    
});


// Logout pages
app.get('/logout',function(req, res){
    req.session.destroy();
    res.redirect("/login");
})

app.get('/admin',function(req,res){
    res.sendFile(__dirname + '/template/pages/samples/adminpannel.html');
})


//forgot 
app.get('/forgot',function(req,res){
    res.sendFile(__dirname + '/template/pages/samples/forgot.html');
});


//it will gets user for all transactions
app.get('/getalltransactions',function(req,res){
    Transaction.find({},function(err,result){
        if(err){
            console.log("err");
        }
        else{
            console.log("result");
            res.send(result)
        }
    })
});

//it will gets users data
app.get('/getallusers',function(req,res){
    usercapstone.find({},function(err,result){
        if(err){
            console.log("err");
        }
        else{
            //console.log("result");
            res.send(result)
        }
    });
});

// app.get('/getusersaggregate', function(req,res){
//     Transaction.aggregate({$group:{_id:{""}}})
// })


//user dashboard
app.get("/dashboard", function(req,res){
    res.redirect("/home");
});
app.get("/addcreditaccount", function(req,res){
    res.sendFile(__dirname + "/template/pages/forms/basic_elements.html");
});
app.get("/monthlytransaction", function(req,res){
    res.sendFile(__dirname + "/template/pages/tables/basic-table.html");
});
app.get("/transactionhistory", function(req,res){
    res.sendFile(__dirname + "/template/pages/icons/mdi.html");
});
app.get("/credpoints", function(req,res){
    res.sendFile(__dirname + "/template/pages/charts/chartjs.html");
});

//it is running in localhost server
app.listen(3000, ()=> console.log("Successfully Server Started at 3000!"));