const mongoose=require('mongoose');
var Joi=require('joi');

var ownerSchema=new mongoose.Schema({
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
    },
    restaurantName:{
        type:String,
        minlength:5,
        maxlength:50,
        required:true
    },
    restaurantImage:{
        type:String,
    },
    restaurantZip:{
        type:String,
        required:true
    }
});
var Owner=mongoose.model("Owner",ownerSchema);

var validateOwner=(owner)=>{
    const schema={
        name: Joi.string().min(5).max(50).required(),
        password:Joi.string().min(5).max(50).required(),
        email:Joi.string().min(5).max(50).required().email(),
        phoneNumber: Joi.string().min(10).max(10),
        restaurantName:Joi.string().min(5).max(50).required(),
        restaurantZip:Joi.string().required()
    };
    return Joi.validate(owner, schema);
}
module.exports.Owner=Owner;
module.exports.validateOwner=validateOwner;