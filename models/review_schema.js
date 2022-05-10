const mongoose=require('mongoose');
const Capstoneproject=mongoose.Schema;
const review=new mongoose.Schema({
    rdata:{
        type:String,
        
    },

});

module.exports=mongoose.model('review',review);