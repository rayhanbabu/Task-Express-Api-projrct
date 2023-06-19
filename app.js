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



mongoose.connect("mongodb://127.0.0.1:27017/TastManager")
     .then(() => {
          //console.log("Server run success");
        })
       .catch((err) => console.log(err));

app.use("/api/v1",router);

app.use("*",(req, res)=>{
    res.status(404).json({status:"Fail",data:"page Not Found"})
});

module.exports=app;