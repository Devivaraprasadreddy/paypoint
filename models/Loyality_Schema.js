const { Int32 } = require('mongodb');
const mongoose=require('mongoose');
const Capstoneproject=mongoose.Schema;
const Loyality_Transaction=new mongoose.Schema({
    Loyality_Transaction:{
        type:Number,
        required:true
    },
    Transaction_ID:{
        type:String,
        required:true
    },
});
module.exports=mongoose.model('Loyality_Transaction',Loyality_Transaction);