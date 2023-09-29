const TaskModel=require('../models/TasksModel');

exports.createTask=async(req, res)=> {
    let reqBody=req.body;
    reqBody.email=req.headers['email'];
    try{
        let result=await TaskModel.create(reqBody);
        res.status(200).json({status:"success",data:result})
    }
    catch (e) {
        res.status(200).json({status:"fail",data:e})
    }
}

exports.deleteTask=async(req, res)=> {
    let id=req.params.id;

    try{
        let result=await TaskModel.findByIdAndDelete(id);
        res.status(200).json({status:"success",data:result})
    }
    catch (e) {
        res.status(200).json({status:"fail",data:e})
    }
}

exports.updateTask=async(req, res)=> {
    let id=req.params.id;
    let reqBody=req.body;
    let query={_id:id};
    try{
        let result=await TaskModel.updateOne(query,reqBody);
        res.status(200).json({status:"success",data:result})
    }
    catch (e) {
        res.status(200).json({status:"fail",data:e})
    }
}

exports.listTaskByStatus=async(req, res)=> {
    let status=req.params.status;
    let email=req.headers['email'];
    let query={status:status,email:email};
    try{
        let result=await TaskModel.find(query);
        res.status(200).json({status:"success",data:result})
    }
    catch (e) {
        res.status(200).json({status:"fail",data:e})
    }
}

exports.statusUpdate=async(req, res)=> {
    let id=req.params.id;
    let status=req.params.status;
    let query={_id:id};
    try{
        let result=await TaskModel.updateOne(query,{status:status});
        res.status(200).json({status:"success",data:result})
    }
    catch (e) {
        res.status(200).json({status:"fail",data:e})
    }
}


