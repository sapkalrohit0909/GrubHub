var express=require('express');
var buyer = require('../routes/buyers');
var owner=require('../routes/owners');
var error=require('../middleware/error');
var item=require("../routes/items");
var order=require("../routes/orders");
module.exports=function(app){
    app.use(express.static('uploads'));
    app.use(express.json());
    app.use(express.urlencoded({extended:true}));
    app.use("/api/buyer",buyer);
    app.use("/api/owner",owner);
    app.use("/api/item",item);
    app.use("/api/order",order);
    app.use(error);
}