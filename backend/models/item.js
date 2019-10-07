const mongoose=require('mongoose');
var Joi=require('joi');

var itemSchema=new mongoose.Schema({
    itemName:{
        type:String,
        minlength:5,
        maxlength:50,
        required:true
    },
    itemImage:{
        type:String,
    },
    itemPrice:{
        type:Number,
        required:true
    },
    itemDescription:{
        type:String,
        required:true
    },
    restaurantId:{
        type:mongoose.Types.ObjectId,
        required:true
    },
    itemCategory:{
        type:String,
        required:true,
        enum:['Breakfast','Lunch','Appetizer']
    }
});
var Item=mongoose.model("Item",itemSchema);

var validateItem=(item)=>{
    const schema={
        itemName: Joi.string().min(5).max(50).required(),
        itemPrice:Joi.number().required(),
        itemDescription: Joi.string().min(5).required(),
        itemCategory:Joi.string().required(),
        itemImage:Joi.string()
    }
    return Joi.validate(item, schema);
}
var validateItemId=(itemId)=>{
    console.log(itemId);
    const schema={
        itemId: Joi.objectId().required()
    }
    return Joi.validate(itemId, schema);
}
module.exports.Item=Item;
module.exports.validateItem=validateItem;
module.exports.validateItemId=validateItemId;
