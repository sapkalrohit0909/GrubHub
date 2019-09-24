const express=require('express');
const router=express.Router();
const auth=require("../middleware/auth");
const {Owner}=require("../models/owner");
const {Buyer}=require("../models/buyer");
const {Order,validateOrder,validateOrderStatus}=require("../models/order");
const {Item}=require("../models/item");
const checkOwner=require("../middleware/checkOwner");
const checkBuyer=require("../middleware/checkBuyer");
const {validateItemId}=require("../models/item");

// Buyer
router.post("/addToCart",[auth,checkBuyer],async(req,res)=>{
    req.body.buyerId=req.user._id;
    let error=validateOrder(req.body);
    if(error.error) return res.status(400).send(error.error.details[0].message);
    let item=await Item.findById(req.body.itemId);
    if(item){
        let order=new Order({
            restaurantId:item.restaurantId,
            itemId:req.body.itemId,
            orderStatus:"inCart",
            buyerId:req.user._id,
            quantity:req.body.quantity
        });
        let result=await order.save();
        return res.send(result);
    }else{
        res.status(400).send("Incorrect Item Id");
    }
})
router.delete("/removeFromCart/:id",[auth,checkBuyer],async(req,res)=>{
    let error=validateItemId({"itemId":req.params.id});
    if(error.error) return res.status(400).send(error.error.details[0].message);
    let order=await Order.findById(req.params.id);
    if(order){
        if(order.buyerId==req.user._id && order.orderStatus=="inCart"){
            let result=await Order.findByIdAndDelete(req.params.id);
            return res.send(result);
        }else{
            return res.status(400).send("Access denied..");
        }
    }else{
        return res.status(400).send("Incorrect Order Id");
    }
})
router.post("/placeOrder",[auth,checkBuyer],async(req,res)=>{
    let result=await Order.updateMany({buyerId:req.user._id,orderStatus:"inCart"},{orderStatus:"Pending"});
    return res.send(result);
})
router.get("/getCart",[auth,checkBuyer],async(req,res)=>{
    let result=await Order.find({buyerId:req.user._id,orderStatus:"inCart"});
    let finalResult=[];
    for(let i=0;i<result.length;i++){
        let newItem={};
        let itemInfo=await Item.find({_id:result[i].itemId});
        newItem.itemName=itemInfo[0].itemName;
        newItem.itemImage=itemInfo[0].itemImage;
        newItem.itemPrice=itemInfo[0].itemPrice;
        newItem.itemDescription=itemInfo[0].itemDescription;
        newItem.itemCategory=itemInfo[0].itemCategory;
        newItem.orderId=result[i]._id;
        let restInfo=await Owner.find({_id:itemInfo[0].restaurantId});
        newItem.restaurantName=restInfo[0].restaurantName;
        finalResult.push(newItem);
    }
    return res.send(finalResult);
})
router.get("/getPlacedOrders",[auth,checkBuyer],async(req,res)=>{
    let result=await Order.find({buyerId:req.user._id,orderStatus:{$in:['New','Preparing','Ready','Pending']}});
    let finalResult=[];
    for(let i=0;i<result.length;i++){
        let newItem={};
        let itemInfo=await Item.find({_id:result[i].itemId});
        newItem.itemName=itemInfo[0].itemName;
        newItem.itemImage=itemInfo[0].itemImage;
        newItem.itemPrice=itemInfo[0].itemPrice;
        newItem.itemDescription=itemInfo[0].itemDescription;
        newItem.itemCategory=itemInfo[0].itemCategory;
        newItem.quantity=result[i].quantity;
        newItem.orderId=result[i]._id;
        let restInfo=await Owner.find({_id:itemInfo[0].restaurantId});
        newItem.restaurantName=restInfo[0].restaurantName;
        finalResult.push(newItem);
    }
    return res.send(finalResult);
})
router.get("/getOldOrders",[auth,checkBuyer],async(req,res)=>{
    let result=await Order.find({buyerId:req.user._id,orderStatus:"Delivered"});
    let finalResult=[];
    for(let i=0;i<result.length;i++){
        let newItem={};
        let itemInfo=await Item.find({_id:result[i].itemId});
        newItem.itemName=itemInfo[0].itemName;
        newItem.itemImage=itemInfo[0].itemImage;
        newItem.itemPrice=itemInfo[0].itemPrice;
        newItem.itemDescription=itemInfo[0].itemDescription;
        newItem.itemCategory=itemInfo[0].itemCategory;
        newItem.quantity=result[i].quantity;
        newItem.orderId=result[i]._id;
        let restInfo=await Owner.find({_id:itemInfo[0].restaurantId});
        newItem.restaurantName=restInfo[0].restaurantName;
        finalResult.push(newItem);
    }
    return res.send(finalResult);
})

// Owner
router.get("/getIncomingOrders",[auth,checkOwner],async(req,res)=>{
    let result=await Order.find({restaurantId:req.user._id,orderStatus:'Pending'});
    let finalResult=[];
    for(let i=0;i<result.length;i++){
        let newItem={};
        let itemInfo=await Item.find({_id:result[i].itemId});
        newItem.itemName=itemInfo[0].itemName;
        newItem.itemImage=itemInfo[0].itemImage;
        newItem.itemPrice=itemInfo[0].itemPrice;
        newItem.itemDescription=itemInfo[0].itemDescription;
        newItem.itemCategory=itemInfo[0].itemCategory;
        newItem.quantity=result[i].quantity;
        newItem.orderId=result[i]._id;
        newItem.orderStatus=result[i].orderStatus;
        let buyerInfo=await Buyer.find({_id:result[i].buyerId});
        newItem.buyerName=buyerInfo[0].name;
        newItem.PhoneNumber=buyerInfo[0].phoneNumber;
        finalResult.push(newItem);
    }
    return res.send(finalResult);
})
router.get("/getAllDeliveredOrders",[auth,checkOwner],async(req,res)=>{
    let result=await Order.find({restaurantId:req.user._id,orderStatus:'Delivered'});
    let finalResult=[];
    for(let i=0;i<result.length;i++){
        let newItem={};
        let itemInfo=await Item.find({_id:result[i].itemId});
        newItem.itemName=itemInfo[0].itemName;
        newItem.itemImage=itemInfo[0].itemImage;
        newItem.itemPrice=itemInfo[0].itemPrice;
        newItem.itemDescription=itemInfo[0].itemDescription;
        newItem.itemCategory=itemInfo[0].itemCategory;
        newItem.quantity=result[i].quantity;
        newItem.orderId=result[i]._id;
        newItem.orderStatus=result[i].orderStatus;
        let buyerInfo=await Buyer.find({_id:result[i].buyerId});
        newItem.buyerName=buyerInfo[0].name;
        newItem.PhoneNumber=buyerInfo[0].phoneNumber;
        finalResult.push(newItem);
    }
    return res.send(finalResult);
})
router.get("/getAllInProcessOrders",[auth,checkOwner],async(req,res)=>{
    let result=await Order.find({restaurantId:req.user._id,orderStatus:{$in:['Preparing','Ready','Pending','Accepted']}});
    let finalResult=[];
    for(let i=0;i<result.length;i++){
        let newItem={};
        let itemInfo=await Item.find({_id:result[i].itemId});
        newItem.itemName=itemInfo[0].itemName;
        newItem.itemImage=itemInfo[0].itemImage;
        newItem.itemPrice=itemInfo[0].itemPrice;
        newItem.itemDescription=itemInfo[0].itemDescription;
        newItem.itemCategory=itemInfo[0].itemCategory;
        newItem.quantity=result[i].quantity;
        newItem.orderId=result[i]._id;
        newItem.orderStatus=result[i].orderStatus;
        let buyerInfo=await Buyer.find({_id:result[i].buyerId});
        newItem.buyerName=buyerInfo[0].name;
        newItem.PhoneNumber=buyerInfo[0].phoneNumber;
        finalResult.push(newItem);
    }
    return res.send(finalResult);
})
router.post("/acceptOrder/:id",[auth,checkOwner],async(req,res)=>{
    let error=validateItemId({"itemId":req.params.id});
    if(error.error) return res.status(400).send(error.error.details[0].message);
    let order=await Order.findById(req.params.id);
    if(order){
        if(order.restaurantId==req.user._id && order.orderStatus=="Pending"){
            let result=await Order.findByIdAndUpdate({_id:req.params.id},{orderStatus:"Accepted"},{new:true});
            return res.send(result);
        }else{
            return res.status(400).send("Access denied..");
        }
    }else{
        return res.status(400).send("Incorrect Order Id");
    }
})
router.post("/DeclineOrder/:id",[auth,checkOwner],async(req,res)=>{
    let error=validateItemId({"itemId":req.params.id});
    if(error.error) return res.status(400).send(error.error.details[0].message);
    let order=await Order.findById(req.params.id);
    if(order){
        if(order.restaurantId==req.user._id && order.orderStatus=="Pending"){
            let result=await Order.findByIdAndUpdate({_id:req.params.id},{orderStatus:"Declined"},{new:true});
            return res.send(result);
        }else{
            return res.status(400).send("Access denied..");
        }
    }else{
        return res.status(400).send("Incorrect Order Id");
    }
})
router.post("/changeOrderStatus/:id",[auth,checkOwner],async(req,res)=>{
    let error=validateItemId({"itemId":req.params.id});
    if(error.error) return res.status(400).send(error.error.details[0].message);
    error=validateOrderStatus(req.body);
    if(error.error) return res.status(400).send(error.error.details[0].message);
    let newOrderStatus=req.body.newStatus;
    let order=await Order.findById(req.params.id);
    if(order){
        if(order.restaurantId==req.user._id && (order.orderStatus=="Accepted"||order.orderStatus=="Ready"||order.orderStatus=="Preparing")){
            let result=await Order.findByIdAndUpdate({_id:req.params.id},{orderStatus:newOrderStatus},{new:true});
            return res.send(result);
        }else{
            return res.status(400).send("Access denied..");
        }
    }else{
        return res.status(400).send("Incorrect Order Id");
    }
})
module.exports=router;