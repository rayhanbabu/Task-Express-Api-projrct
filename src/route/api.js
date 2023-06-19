const express=require('express');
const {models} = require("mongoose");
const router =express.Router();

UsersController=require("../controller/UsersController");
TasksConttroller=require("../controller/TaksController");
const AuthVerifyMiddleware=require('../middleware/AuthVerifyMiddleware')

//Before Login
router.post("/registration",UsersController.registration);
router.post("/login",UsersController.login);
router.get("/send-otp/:email",UsersController.SendOTP);
router.get("/verify-otp/:email/:otp",UsersController.VerifyOTP);

//After Login
router.get("/profile-details",AuthVerifyMiddleware,UsersController.profileDetails);

//task
router.post("/create-task",AuthVerifyMiddleware,TasksConttroller.createTask);
router.delete("/delete-task/:id",AuthVerifyMiddleware,TasksConttroller.deleteTask);
router.post("/update-task/:id",AuthVerifyMiddleware,TasksConttroller.updateTask);
router.get("/list-task-by-status/:status",AuthVerifyMiddleware,TasksConttroller.listTaskByStatus);

module.exports=router;