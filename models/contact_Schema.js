const mongoose = require('mongoose');
const capstoneproject = mongoose.Schema;
const contact = new mongoose.Schema({
    cname:{
        type:String,
      
    },
    cemail:{
        type:String,
        
    },
    csubject:{
        type:String,
       
    },
    cmessage:{
        type:String,
       
    }
});
module.exports=mongoose.model('contact',contact);
