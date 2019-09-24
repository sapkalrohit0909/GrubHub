const {Buyer}=require("../models/buyer");
module.exports = async(req, res, next)=> {
  let buyer=await Buyer.findById(req.user._id);
  if (!buyer) {
    return res.status(400).send('Access denied. You are not allowed to place order');
  }else{
      next();
  };
  
}