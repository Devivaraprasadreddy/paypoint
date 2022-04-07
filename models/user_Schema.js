
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
    wallet:{
        type:Number,
        required:true
    },
    Card_Name:{
        type:String,
        required:true
    },
    Card_Number:{
        type:String,
        required:true
    },
    Loyality_Points:{
        type:Number,
        required:true
    },
    Valid_Till_Upto:{
        type:String,
        required:true
    },
});

module.exports = mongoose.model('Usercapstone',usercapstone);
