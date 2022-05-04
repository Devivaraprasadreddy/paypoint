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


app.post('/cashdata',function(req,res){
    session = req.session;
    
    if(session.user){
        // console.log(session.user)
        // console.log(req.body);
    

    if(parseInt(req.body.amount) > session.user.balance){
        console.log("working")
        res.send("working")
    }
    else{
    //     assignment.update({amount:req.body.amount},assignment,{upsert:true})

        cash.findOne({amount:req.body.amount},function(err,docs){
            if(err){
                console.log(err)
                // var check = {
                //     accountholdername:req.body.accountholdername,
                //     amount:req.body.amount
                // }
                // var obj = new cash({
                //     accountholdername:req.body.accountholdername,
                //     accountnumber:req.body.accountnumber,
                //     branchname:req.body.branchname,
                //     ifsccode:req.body.ifsccode,
                //     amount:req.body.amount,
                //     user_email:session.user.email
                // })
                console.log(req.body)
                // console.log(obj)
                // obj.save(function(err,result){
                    // if(result){
                    //     console.log("results"+ result);
                    //     res.send(result);
                    // }
                    // else{
                    //     console.log(err)
                    //     res.send(err);
                    // }
                // })
            }
            else{
                console.log(docs)
            }
            // else{
            //     console.log(docs)
            //     res.sendStatus(500)
            // }
        })
    // console.log("kk")
}
    
}
// else{
//     console.log("working")
// }
 })
//login checking

//post the data to database

app.post('/logindata',function(req,res){
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

//post the admin data to database
app.post('/admindata',function(req,res){
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


//to get the user data in database
app.get('/getassignmentdata',(req,res)=>{
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
    res.sendFile(__dirname + "/template/pages/samples/home.html");
});
app.get('/popup',function(req,res){
    res.sendFile(__dirname + '/template/pages/samples/popup.html');
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

// app.get('/admin',function(req,res){
//     res.sendFile(__dirname + '/template/pages/samples/adminpannel.html')
// })

//terms and conditions page
app.get('/terms',function(req,res){
    res.sendFile(__dirname + '/template/pages/samples/terms.html');
});

//home page
app.get('/home',function(req,res){
    session = req.session;
    if(session.user){
        res.sendFile(__dirname+'/user.html');
    }else{
        res.redirect("/login");
    }
    
});

// app.get('/logout',function(req,res){
//     res.sendFile('/template/pages/samples/login.html');
// })


// Logout pages
app.get('/logout',function(req, res){
    req.session.destroy();
    res.redirect("/");
})

app.get('/admin',function(req,res){
    // res.sendFile(__dirname + '/template/pages/samples/adminpannel.html');
    session = req.session;
    if(session.user){
        console.log(session.user)
        res.sendFile(__dirname + '/template/pages/samples/adminpannel.html')
    }
    else{
        res.redirect('/adminlogin');
    }
})

app.get('/adminlogout',function(req,res){
    req.session.destroy();
    res.redirect('/adminlogin');
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

// app.get('/getusersaggregate', function(req,res){
//     Transaction.aggregate({$group:{_id:{""}}})
// })


//user dashboard
app.get("/dashboard", function(req,res){
    res.redirect("/home");
});
app.get("/addcreditaccount", function(req,res){
    // res.sendFile(__dirname + "/template/pages/forms/basic_elements.html");
    // res.redirect("/addcreditaccount");
    session = req.session;
    if(session.user){
        res.sendFile(__dirname+'/template/pages/forms/basic_elements.html');
    }else{
        res.redirect("/login");
    }
});
app.get("/monthlytransaction", function(req,res){
    // res.sendFile(__dirname + "/template/pages/tables/basic-table.html");
    // res.redirect("/monthlytransaction");
    session = req.session;
    if(session.user){
        res.sendFile(__dirname+'//template/pages/tables/basic-table.html');
    }else{
        res.redirect("/login");
    }
});
app.get("/transactionhistory", function(req,res){
    // res.sendFile(__dirname + "/template/pages/icons/mdi.html");
    // res.redirect("/transactionhistory");
    session = req.session;
    if(session.user){
        res.sendFile(__dirname+'/template/pages/icons/mdi.html');
    }else{
        res.redirect("/login");
    }
});
app.get("/credpoints", function(req,res){
    // res.sendFile(__dirname + "/template/pages/charts/chartjs.html");
    // res.redirect("/credpoints");
    session = req.session;
    if(session.user){
        res.sendFile(__dirname+'/template/pages/charts/chartjs.html');
    }else{
        res.redirect("/login");
    }
});


//admin dashboard

app.get('/usertables',function(req,res){
    res.sendFile(__dirname + '/template/pages/tables/basic-table.html');
});

app.get('/charts',function(req,res){
    res.sendFile(__dirname + '/template/pages/charts/chartjs.html');
});

app.get('/admin/dashboard',function(req,res){
    res.sendFile(__dirname + '/template/pages/samples/adminpannel.html');
});


app.post('/user_addaccount',function(req,res){
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


//it is running in localhost server
app.listen(3000, ()=> console.log("Successfully Server Started at 3000!"));