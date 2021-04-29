const mongoose=require('mongoose');

/* room model
 */const roomSchema=new mongoose.Schema({
    roomId: {
        type:String,
        default: '0',
    },  
    users:[],
    createdAt: { 
        type: Date,
        default: Date.now,
    }

})
const Room=mongoose.model('Room',roomSchema)
module.exports=Room