
const mongoose=require('mongoose');


const Capstoneproject=mongoose.Schema;
const usercapstone=new mongoose.Schema({
    User_id:{
        type:Number,
        required:true
    },
    User_Name:{
        type:String,
        required:true
    },
    User_Address:{
        type:String,
        required:true
    },
    User_email:{
        type:String,
        required:true
    },
    Password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        required:true
    },
    refferal_code:{
        type:String,
        required:true

    },
    walletPoints:{
        type:Number,
       
    },
    Card_Name:{
        type:String,
       
    },
    Card_Number:{
        type:String,
      
    },
    Loyality_Points:{
        type:Number,
       
    },
    cvv:{
        type:String
    },
    Month:{
        type:String,
        
    },
    Year:{
        type:String
    },
    balance:{
        type:Number
    },
});

module.exports = mongoose.model('Usercapstone',usercapstone);
