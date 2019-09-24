const mongoose=require('mongoose');
var Joi=require('joi');

var orderSchema=new mongoose.Schema({
    restaurantId:{
        type:mongoose.Types.ObjectId,
        required:true
    },
    itemId:{
        type:mongoose.Types.ObjectId,
        required:true
    },
    orderStatus:{
        type:String,
        required:true,
        enum:['New','Preparing','Ready','Delivered','Pending','Accepted','inCart',"Declined"]
    },
    buyerId:{
        type:mongoose.Types.ObjectId,
        required:true
    },
    quantity:{
        type:Number,
        required:true,
    }
});

var Order=mongoose.model("Order",orderSchema);
var validateOrder=(order)=>{
    const schema={
        itemId:Joi.objectId().required(),
        buyerId:Joi.objectId().required(),
        quantity:Joi.number().required()
    }
    return Joi.validate(order, schema);
}
var validateOrderStatus=(orderStatus)=>{
    const schema={
        newStatus:Joi.string().required()
    }
    return Joi.validate(orderStatus, schema);
}
module.exports.Order=Order;
module.exports.validateOrder=validateOrder;
module.exports.validateOrderStatus=validateOrderStatus;
