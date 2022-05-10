const mongoose=require('mongoose');
const Capstoneproject=mongoose.Schema;
const admindata=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
});
module.exports=mongoose.model('admindata',admindata);