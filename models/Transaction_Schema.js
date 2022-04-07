const { Int32, Double } = require('mongodb');
const mongoose=require('mongoose');
const Capstoneproject=mongoose.Schema;
const Transaction=new mongoose.Schema({
    Transaction_id:{
        type:Number,
        required:true
    },
    Transaction_type:{
        type:String,
        required:true
    },
    User_id:{
        type:Number,
        required:true
    },
    Transaction_date:{
        type:Date,
        required:true
    },
    Amount:{
        type:Number,
        required:true
    },
    Loyality_Points:{
        type:String,
        required:true
    },
    Transaction_account:{
        type:String,
        required:true
    },
    user_name:{
        type:String,
        required:true
    },
});
module.exports=mongoose.model('Transaction',Transaction);