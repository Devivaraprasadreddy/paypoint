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


//calling the all schemas
const assignment = require('../models/schema.js');
const Transaction=require('../models/Transaction_Schema.js');
const usercapstone=require('../models/user_Schema.js');
const Loyality_Transaction=require('../models/Loyality_Schema.js');
const cash = require('../models/cash_schema.js');



// Dashboard page
//frontend pages js
router.get("/", function(req,res){
    res.sendFile(path.resolve ("template/pages/samples/home.html"));
});
router.get('/popup',function(req,res){
    res.sendFile(path.resolve('template/pages/samples/popup.html'));
});

//home page
router.get('/home',function(req,res){
    session = req.session;
    if(session.user){
        res.sendFile(path.resolve('user.html'));
    }else{
        res.redirect("/login");
    }
    
});

// Logout pages
router.get('/logout',function(req, res){
    req.session.destroy();
    res.redirect("/");
})

//forgot 
router.get('/forgot',function(req,res){
    res.sendFile(path.resolve('template/pages/samples/forgot.html'));
});

//it will gets user for all transactions
router.get('/getalltransactions',function(req,res){
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
router.get('/getallusers',function(req,res){
    session = req.session;
    if(session.user){
        assignment.find({"_id":session.user._id},function(err,result){
            if(err){
                console.log("err");
            }
            else{
                //console.log("result");
                res.send(result)
            }
        });
    }
    else{
        console.log(err);
    }

  
});


router.get("/dashboard", function(req,res){
    res.redirect("/home");
});
router.get("/addcreditaccount", function(req,res){
    // res.sendFile(path.resolve + "/template/pages/forms/basic_elements.html");
    // res.redirect("/addcreditaccount");
    session = req.session;
    if(session.user){
        res.sendFile(path.resolve('template/pages/forms/basic_elements.html'));
    }else{
        res.redirect("/home");
    }
});
router.get("/monthlytransaction", function(req,res){
    // res.sendFile(path.resolve + "/template/pages/tables/basic-table.html");
    // res.redirect("/monthlytransaction");
    session = req.session;
    if(session.user){
        res.sendFile(path.resolve('template/pages/tables/basic-table.html'));
    }else{
        res.redirect("/home");
    }
});
router.get("/transactionhistory", function(req,res){
    // res.sendFile(path.resolve + "/template/pages/icons/mdi.html");
    // res.redirect("/transactionhistory");
    session = req.session;
    if(session.user){
        res.sendFile(path.resolve('template/pages/icons/mdi.html'));
    }else{
        res.redirect("/home");
    }
});
router.get("/credpoints", function(req,res){
    // res.sendFile(path.resolve + "/template/pages/charts/chartjs.html");
    // res.redirect("/credpoints");
    session = req.session;
    if(session.user){
        res.sendFile(path.resolve('template/pages/charts/chartjs.html'));
    }else{
        res.redirect("/home");
    }
});

router.post('/cashdata',function(req,res){
    session = req.session;
    
    if(session.user){
    //     console.log(session.user)
    //     // console.log(req.body);
    // console.log(session.user.balance);
    // console.log("amnt"+req.body.amount);

    if(parseInt(req.body.amount) > session.user.balance){
        console.log("working")
        // res.send("working")
    }
    else if(session.user.balance == undefined){
        res.sendStatus(500)
    }
    else{
        var balances = session.user.balance - parseInt(req.body.amount)
        var point = parseInt(req.body.amount)/6
        assignment.findOneAndUpdate({name:session.user.name},{$set:{balance:balances,walletPoints:point}}, function(err,docs){
            if(err){
                console.log(err)
            }
            else{
                console.log(docs)
            }
        })
        // async function assignmentdata(){
        // const update = {balance:req.body.amount};
        // let doc= await assignment.findOne({email:req.body.email})
 
        // doc.amount=session.user.balance-req.body.amount
        // await doc.save();
        // doc=await assignment.findOne();
        // doc.amount;
        // doc.balance;
        // console.log(doc.amount);
        // console.log(doc.balance);
        // }
                   
                var obj = new cash({
                    accountholdername:req.body.accountholdername,
                    accountnumber:req.body.accountnumber,
                    branchname:req.body.branchname,
                    ifsccode:req.body.ifsccode,
                    amount:req.body.amount,
                    user_email:session.user.email
                })
                obj.save(function(err,result){
                    if(result){
                        // console.log("results"+ result);
                        res.send(result);
                    }
                    else{
                        console.log(err)
                        res.send(err);
                    }
                })
            }
}
    
// else{
//     console.log("working")
// }
 })


router.post('/user_addaccount',function(req,res){
    //    console.log(req.session);
        session = req.session;
        if(session.user){
            // console.log(req.body);
        // console.log(session.user);
        var data={
            Card_Name:req.body.cardholder_name,
            Card_Number:req.body.cardnumber,
            cvv:req.body.cvv,
            Month:req.body.ExpirationMonth,
            Year:req.body.year,
            balance:5000,
            // wallet:req.body.wallet,
            // refferal_code:req.body.refferal_code
    
        }
        var filter={
            "_id":session.user._id
    
        }
    
        assignment.findOneAndUpdate(filter,data,{new:true},function(err,docs){
            if(err){
                console.log(err);
            }
            else{
                console.log(docs);
            }
        });
    
    
        }else{
            console.log("err");
        }
    });
    
    


//to get the user data in database
router.get('/getassignmentdata',(req,res)=>{
    assignment.find(function(err,result){
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



//post the data to database 

router.post('/sendData',function(req,res){
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

module.exports=router;


