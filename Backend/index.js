const express=require('express');
const dotEnv=require('dotenv');
const user = require('./routes/user');
const room = require('./routes/room');
const mongoose=require('mongoose');
const Pusher=require('pusher');
const path=require('path');
var cors = require('cors')


const connectDb = require('./database/db');
const Room = require('./model/room');
const Msg = require('./model/messages');
const bodyParser = require('body-parser');



const app=express()
app.use(cors())

dotEnv.config({path:'./config/config_env.env'})


app.use(bodyParser.json({limit:'50mb'}));
app.use(bodyParser.urlencoded({extended:true, limit:'50mb' }))

app.use(express.static(path.join(__dirname, 'uploads')))

app.get("/uploads/:img",function (req, res) {
  res.sendFile(`${__dirname}/uploads/${req.params.img}`)
});
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
  
if(change.operationType==='insert'){ 

   
    const data=change.fullDocument  
    pusher.trigger("Message", "inserted", {
        message:data.messages
      });
 
}
if(change.operationType==='delete'){    
  pusher.trigger("Message", "deleted",{
    message:''
  })
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
connectDb(process.env.TEST_CLUSTER)
//End of database
 
const Port=process.env.PORT||5000
app.listen(Port,()=>{console.log(Port);})
