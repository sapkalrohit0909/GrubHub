const express=require('express');
const router=express.Router();
const {Owner,validateOwner}=require('../models/owner');
const bcrypt = require('bcrypt');
let Joi=require('joi');
Joi=Joi.extend(require('joi-phone-number'));
const config=require('config');
const jwt=require('jsonwebtoken');
const auth=require('../middleware/auth');
const {uploads}=require('../middleware/uploadFile');
const checkOwner=require("../middleware/checkOwner");
router.post("/signUp",async(req,res)=>{
    const {error}=validateOwner(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let owner = await Owner.findOne({ email: req.body.email });
    if (owner) return res.status(400).send('Owner already registered.');

    owner = new Owner({ 
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        restaurantName:req.body.restaurantName,
        restaurantZip:req.body.restaurantZip
    });
    const salt = await bcrypt.genSalt(10);
    owner.password = await bcrypt.hash(owner.password, salt);
    var result=await owner.save();
    return res.send({
        name:result.name,
        email:result.email,
        restName:result.restName,
        restZip:result.restZip,
        _id:result._id
    });
})
router.post("/signIn",async(req,res)=>{
    var Schema={
        email:Joi.string().min(5).max(50).required().email(),
        password:Joi.string().min(5).max(50).required()
    };
    var {error}=Joi.validate(req.body,Schema);
    if(error) return res.status(400).send(error.details[0].message);
    let owner=await Owner.findOne({ email: req.body.email });
    if(!owner) return res.status(400).send('Invalid Email or Password');
    let result=await bcrypt.compare(req.body.password,owner.password);
    if(!result) return res.status(400).send('Invalid Email or Password');
    console.log(owner);
    let temp={"_id":owner._id,"name":owner.name,"email":owner.email,"restaurantName":owner.restaurantName,"restaurantZip":owner.restaurantZip};
    console.log(temp);
    const token=jwt.sign(temp,config.get("jwtPrivateKey"));
    return res.send(token);
})
router.put("/",[auth,checkOwner],async(req,res)=>{
    let schema={
        name: Joi.string().min(5).max(50).required(),
        phoneNumber: Joi.string().min(10).max(10),
        restaurantName:Joi.string().min(5).max(50).required(),
        restaurantZip:Joi.string().required()
    }
    let {error}=Joi.validate(req.body,schema);
    if(error) return res.status(400).send(error.details[0].message);
    let owner=await Owner.findByIdAndUpdate({_id:req.user._id},{
        name:req.body.name,
        phoneNumber:req.body.phoneNumber,
        restaurantName:req.body.restaurantName,
        restaurantZip:req.body.restaurantZip
    },{new:true}).select({name:1,email:1,phoneNumber:1,restaurantName:1,restaurantZip:1});
    return res.send(owner);
})
router.post("/uploadProfilePicture",[auth,checkOwner,uploads.single('profilePicture')],async(req,res)=>{
    let owner=await Owner.findOneAndUpdate({_id:req.user._id},{profileImage:req.file.filename},{new:true}).select({name:1,email:1,phoneNumber:1,restaurantName:1,restaurantZip:1,profileImage:1});
    res.send(owner);
})


module.exports=router;