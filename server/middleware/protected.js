const User=require('../models/user')

module.exports=async(req,res,next)=>{
    if(!req.userId){
        return res.sendStatus(401);
    }
    next();
};