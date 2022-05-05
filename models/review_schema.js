const mongoose=require('mongoose');
const Capstoneproject=mongoose.Schema;
const review=new mongoose.Schema({
    text:{
        type:String,
        required:true
    },

});

module.exports=mongoose.model('review',review);