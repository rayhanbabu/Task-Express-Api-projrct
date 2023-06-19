const mongoose=require('mongoose');

const UserSchema=mongoose.Schema(
    {
        email:{type:String,unique:true},
        firstName:{type:String},
        lastName:{type:String},
        mobile:{type:String},
        password:{type:String}
    },
    {timestamps:true,versionKey:false}
)

const UserModel=mongoose.model('users',UserSchema);
module.exports=UserModel;