const UsersModel=require('../models/UsersModel');
const OTPModel=require('../models/OTPModel');
const SendEmailUtility=require('../utility/SendEmailUtility');

const jwt=require("jsonwebtoken");


 exports.registration=async (req,res)=>{
           let reqBody=req.body;
      try{
           let result=  await  UsersModel.create(reqBody);
           res.status(200).json({status:"success", data:result})
      }catch(e){
           res.status(200).json({status:"Fail", data:e})
      }
  }

  exports.login=async (req,res)=>{
      try{
          let reqBody=req.body;
          let result=  await  UsersModel.find(reqBody).count('total');
          if(result===1){
                //Token Issue
               let PayLoad={
                   exp:Math.floor(Date.now()/1000)+(24*60*60),
                   data:reqBody['email']
               }

               let token=jwt.sign(PayLoad, 'SecretLy349545653545');


               res.status(200).json({status:"success", data:token})
          }else{
               res.status(200).json({status:"fail", data:result})
          }
      }catch(e){
          res.status(200).json({status:"Fail", data:e})
      }
  }

 exports.profileUpdate=async (req,res)=>{
     try{
         let  email=req.headers.email;
         let reqBody=req.body;
         await UsersModel.updateOne({email: email}, {$set:reqBody}, {upsert:true});
         res.status(200).json({status:"Success",data:"Profile Save Changed"});
     }catch(e){
         res.status(200).json({status:"Fail",data:e});
     }
   }


  exports.profileDetails=async (req,res)=>{
     try{
           let  email=req.headers.email;
           let result=await UsersModel.find({email:email});
           res.status(200).json({status:"Success",data:result});
     }catch(e){
           res.status(200).json({status:"Fail",data:e});
     }
  }

  exports.SendOTP=async (req,res)=>{
        let email=req.params.email;
        let OTPCode=Math.floor(100000+Math.random()*900000);

        try{
            await  OTPModel.create({email:email,otp:OTPCode});
            await SendEmailUtility(email,`PIN CODE IS ${OTPCode}`,"Mern Batch3");
            res.status(200).json({status:"success", data:'result'});

        }catch(e){
            res.status(200).json({status:"Fail", data:e})
        }
  }

   exports.VerifyOTP=async(req,res)=> {
       let email = req.params.email;
       let otp = req.params.otp;
       try {
           let result = await OTPModel.find({email: email, otp: otp, status: 0}).count('total');
           if (result === 1) {
               await OTPModel.updateOne({email: email, otp: otp, status: 0}, {status: 1});
               res.status(200).json({status: "success", data: 'Verificataion Success'});
           } else {
               res.status(200).json({status: "fail", data: 'Already Used'});
           }
       } catch (e) {
           res.status(200).json({status: "Fail", data: e})
       }
   }

       exports.passwordUpdate=async(req,res)=>{
           let email=req.params.email;
           try{
               let password=req.body.password;
               let confirm_password=req.body.confirmPassword;
               if(password===confirm_password){
                   await UsersModel.updateOne({email: email}, {password:password});
                   res.status(200).json({status:"success", data:"Password Update SuccessFull"});
               }else{
                   res.status(200).json({status:"Fail", data:"Password Not match"});
               }

           }catch(e){
               res.status(200).json({status:"Fail", data:e})
           }
      }




