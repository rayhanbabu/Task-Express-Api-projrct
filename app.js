const express=require('express');
const router=require('./src/route/api');
const app=new express();
const bodyParser=require('body-parser');
const rateLimit=require('express-rate-limit');
const  helmet=require('helmet');
const mongoSanitize=require('express-mongo-sanitize');
const hpp=require('hpp');
const cors=require('cors');
const mongoose=require('mongoose');


//security
app.use(cors());
app.use(helmet());
app.use(mongoSanitize());
app.use(hpp());
app.use(express.json({limit:'50mb'}));
app.use(express.urlencoded({limit:'50mb'}));

//aJSON Parser

app.use(bodyParser.json())

//Rate Limiting
const limiter=rateLimit({windowMs:15*60*1000,max:300});
app.use(limiter);



//Database
mongoose.connect("mongodb+srv://rayhanbabu458:rayhanbabu458@atlascluster.q16wgcx.mongodb.net/taskmanager")
    .then(()=>{
       // console.log("run database");
    })
    .catch((err) => console.log(err));
//Managing BackEnd API Routing   localhost:5000/api/v1
app.use('/',router)



app.use("*",(req, res)=>{
    res.status(404).json({status:"Fail",data:"page Not Found"})
});

module.exports=app;