var express=require('express');
const router=express.Router();
var {Buyer,validateBuyer}=require('../models/buyer');
const bcrypt = require('bcrypt');
const config=require('config');
const jwt=require('jsonwebtoken');
const Joi=require('Joi');
const auth=require('../middleware/auth');
const {uploads}=require('../middleware/uploadFile');
const checkBuyer=require("../middleware/checkBuyer");
router.post("/signUp",async(req,res)=>{
    const {error}=validateBuyer(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let buyer = await Buyer.findOne({ email: req.body.email });
    if (buyer) return res.status(400).send('Buyer already registered.');

    buyer = new Buyer({ 
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });
    const salt = await bcrypt.genSalt(10);
    buyer.password = await bcrypt.hash(buyer.password, salt);
    var result=await buyer.save();
    return res.send({
        name:result.name,
        email:result.email,
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
    let buyer=await Buyer.findOne({ email: req.body.email });
    if(!buyer) return res.status(400).send('Invalid Email or Password');
    let result=await bcrypt.compare(req.body.password,buyer.password);
    if(!result) return res.status(400).send('Invalid Email or Password');
    let temp={"_id":buyer._id,"name":buyer.name,"email":buyer.email};
    const token=jwt.sign(temp,config.get("jwtPrivateKey"));
    return res.send(token);
})
router.put("/",[auth,checkBuyer],async(req,res)=>{
    let schema={
        name: Joi.string().min(5).max(50).required(),
        phoneNumber: Joi.string().min(10).max(10)
    }
    let {error}=Joi.validate(req.body,schema);
    if(error) return res.status(400).send(error.details[0].message);
    let buyer=await Buyer.findByIdAndUpdate({_id:req.user._id},{
        name:req.body.name,
        phoneNumber:req.body.phoneNumber
    },{new:true}).select({name:1,email:1,phoneNumber:1});
    return res.send(buyer);
})
router.post("/uploadProfilePicture",[auth,checkBuyer,uploads.single('profilePicture')],async(req,res)=>{
    let buyer=await Buyer.findOneAndUpdate({_id:req.user._id},{profileImage:req.file.filename},{new:true}).select({name:1,email:1,phoneNumber:1,profileImage:1});
    res.send(buyer);
})

module.exports=router;