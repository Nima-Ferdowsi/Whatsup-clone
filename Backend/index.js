const express=require('express');
const dotEnv=require('dotenv');
const user = require('./routes/user');
const room = require('./routes/room');
const mongoose=require('mongoose');
const Pusher=require('pusher');

const connectDb = require('./database/db');
const Room = require('./model/room');
const Msg = require('./model/messages');



const app=express()
dotEnv.config({path:'./config/config_env.env'})


app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', '*');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
}); 

const pusher = new Pusher({
    appId: "1193874",
    key: "f1aaf06bf13b9df96407",
    secret: "e9a0e66cbd661e088cb8",
    cluster: "eu",
    useTLS: true
  });


const db=mongoose.connection 
 
db.once('open',()=>{
    const msg=db.collection('Messages')
const changeStream =Msg.watch()
console.log('Database Is Now Running')
 
changeStream.on('change', (change) => { 
console.log(change);
  
if(change.operationType==='insert'){ 

   
    const data=change.fullDocument  
    pusher.trigger("Message", "inserted", {
        message:data.messages
      });
 
}
 
  
      

}); 
 
})  
db.on('error', function (err) {
    console.log('mongodb connection error: %s', err);
    process.exit();  
  });
//Routes 
//user routes  
app.use(user)
app.use(room)
//End of Routes

//Database(connect to database)
connectDb(process.env.CLUSTER_URI)
//End of database
 
const Port=process.env.Port||5000
app.listen(Port,()=>{console.log(Port);})
