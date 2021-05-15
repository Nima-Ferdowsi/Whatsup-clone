const mongoose=require('mongoose');


//user schema
const userSchema=new mongoose.Schema({
    firstname:{
        type:String,
        required: true,
        trim:true
        
    },
    lastname:{
        type:String,
        required: true,
        trim:true
    },
    email:{
        type:String,
        required: true,
        unique: true
    }
    ,
    pass: {
        type: String,
        required: true,
        maxlength: 255,
    },
    avatar:{
        type:String,
        default:'',
    },
    room:[],
    createdAt: {
        type: Date,
        default: Date.now,
    }
    
    
})
//user model
const User=mongoose.model('User',userSchema)

module.exports=User