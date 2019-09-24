const mongoose=require('mongoose');
var Joi=require('joi');

var buyerSchema=new mongoose.Schema({
    name:{
        type:String,
        minlength:5,
        maxlength:50,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    email:{
        type:String,
        minlength:5,
        maxlength:50,
        required:true
    },
    profileImage:{
        type:String,
    },
    phoneNumber:{
        type:String,
        minlength:10,
        maxlength:10
    }
});
var Buyer=mongoose.model("Buyer",buyerSchema);

var validateBuyer=(buyer)=>{
    const schema={
        name: Joi.string().min(5).max(50).required(),
        password:Joi.string().min(5).max(50).required(),
        email:Joi.string().min(5).max(50).required().email(),
        phoneNumber: Joi.string().min(10).max(10)
    }
    return Joi.validate(buyer, schema);
}
module.exports.Buyer=Buyer;
module.exports.validateBuyer=validateBuyer;
