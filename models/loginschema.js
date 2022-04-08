const mongoose=require('mongoose');
const Capstoneproject=mongoose.Schema;
const logindata=new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },

});

module.exports=mongoose.model('logindata',logindata);