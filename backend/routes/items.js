const express=require('express');
const router=express.Router();
const auth=require("../middleware/auth");
const {Item,validateItem,validateItemId}=require("../models/item");
const checkOwner=require("../middleware/checkOwner");
const {uploads}=require('../middleware/uploadFile');
router.post("/",[auth,checkOwner,uploads.single('itemImage')],async(req,res)=>{
    let error=validateItem(req.body);
    if(error.error) return res.status(400).send(error.error.details[0].message);
    let item=new Item({
        itemName:req.body.itemName,
        itemPrice:Number.parseFloat(req.body.itemPrice),
        itemDescription:req.body.itemDescription,
        restaurantId:req.user._id,
        itemImage:req.file.filename,
        itemCategory:req.body.itemCategory
    });
    try{
        let result=await item.save();
        res.send(result);
    }catch(ex){
        res.status(400).send(ex.message);
    }
})
router.put("/:id",[auth,checkOwner],async(req,res)=>{
    let error=validateItem(req.body);
    if(error.error) return res.status(400).send(error.error.details[0].message);
    let itemToBeModified=await Item.findById(req.params.id);
    if(itemToBeModified){
        if(itemToBeModified.restaurantId==req.user._id){
            let result=await Item.findByIdAndUpdate({_id:req.params.id},{
                itemName:req.body.itemName,
                itemPrice:req.body.itemPrice,
                itemDescription:req.body.itemDescription,
                itemCategory:req.body.itemCategory
            },{new:true});
            return res.send(result);
        }else{
            res.status(400).send("This item does not belong to your restaurant so you can not change it");
        }
    }else{
        res.status(400).send("Incorrect Item Id");
    }    
})
router.put("/changeItemImage/:id",[auth,checkOwner,uploads.single('profilePicture')],async(req,res)=>{
    console.log("inside");
    if(req.file){
        let itemToBeModified=await Item.findById(req.params.id);
        if(itemToBeModified){
            if(itemToBeModified.restaurantId==req.user._id){
                let buyer=await Item.findOneAndUpdate({_id:req.params.id},{itemImage:req.file.filename},{new:true});
                console.log(buyer);
                res.send(buyer);    
            }else{
                res.status(400).send("This item does not belong to your restaurant so you can not change it");
            }        
        }else{
            res.status(400).send("Incorrect Item Id");
        }
    }else{
        return res.status(400).send("profilePicture needed");
    }
    
    
})
router.delete("/:id",[auth,checkOwner],async(req,res)=>{
    let error=validateItemId({"itemId":req.params.id});
    if(error.error) return res.status(400).send(error.error.details[0].message);
    let itemToBeDeleted=await Item.findById(req.params.id);
    if(itemToBeDeleted.restaurantId==req.user._id){
        let result=await Item.findByIdAndDelete(req.params.id);
        res.send(result);
    }else{
        res.status(400).send("This item does not belong to your restaurant so you can not change it");
    }
})
router.get("/breakfast/:restId",auth,async(req,res)=>{
    let error=validateItemId({"itemId":req.params.restId});
    if(error.error) return res.status(400).send(error.error.details[0].message);
    let result=await Item.find({restaurantId:req.params.restId,itemCategory:"Breakfast"});
    return res.send(result);
})
router.get("/lunch/:restId",auth,async(req,res)=>{
    let error=validateItemId({"itemId":req.params.restId});
    if(error.error) return res.status(400).send(error.error.details[0].message);
    let result=await Item.find({restaurantId:req.params.restId,itemCategory:"Lunch"});
    return res.send(result);
})
router.get("/appetizer/:restId",auth,async(req,res)=>{
    let error=validateItemId({"itemId":req.params.restId});
    if(error.error) return res.status(400).send(error.error.details[0].message);
    let result=await Item.find({restaurantId:req.params.restId,itemCategory:"Appetizer"});
    return res.send(result);
})
module.exports=router;
