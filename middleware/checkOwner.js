const {Owner}=require("../models/owner");
module.exports = async(req, res, next)=> {
  let owner=await Owner.findById(req.user._id);
  if (!owner) {
    return res.status(400).send('Access denied. You are not allowed to modify items')
  }else{
      next();
  };
  
}