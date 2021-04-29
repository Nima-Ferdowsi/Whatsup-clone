const mongoose=require('mongoose');

//message model
const msgSchema=new mongoose.Schema({
    roomId: {
        type:String,
    },  
    messages:Object
    ,
 
    createdAt: { 
        type: Date,
        default: Date.now,
    }

})
const Msg=mongoose.model('Messages',msgSchema)
module.exports=Msg