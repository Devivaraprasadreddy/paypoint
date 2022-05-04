const mongoose=require('mongoose');
const Capstoneproject=mongoose.Schema;
const cash =new mongoose.Schema({
  
    accountholdername:{
        type:String,
        required:true
    },
    accountnumber:{
        type:String,
        required:true
    },
    branchname:{
        type:String,
        required:true
    },
    ifsccode:{
        type:String,
        required:true
    },
    amount:{
        type:String,
        required:true
    },
    user_email:{
        type:String
    },

});

module.exports=mongoose.model('cash',cash);