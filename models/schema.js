const mongoose = require('mongoose');

const Sample =mongoose.Schema;
const assignment = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    number:{
        type:Number,
        required:true
    },
    password:{
        type:String,
        required:true
    },
 
    refferal_code:{
        type:String
        

    },
    wallet:{
        type:Number
       
    },
    Card_Name:{
        type:String
       
    },
    Card_Number:{
        type:String
      
    },
    Loyality_Points:{
        type:Number
       
    },
    cvv:{
        type:String
    },
    Month:{
        type:String
        
    },
    Year:{
        type:String
    },
    balance:{
        type:Number
    },
    walletPoints:{
        type:Number
    }

});

module.exports = mongoose.model('assignment',assignment);