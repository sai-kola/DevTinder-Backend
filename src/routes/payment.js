const express=require("express");
const { userAuth } = require("../middlewares/auth");
const paymentRounter=express.Router();

paymentRounter.post("payment/create",userAuth , async(req,res)=>{
    try{
        
    }
    catch(err){

    }
})

module.exports=paymentRounter