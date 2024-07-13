const express=require("express");
const router = express.Router();
const jwt=require("jsonwebtoken");
const User=require("../models/user");
const bcrypt=require("bcryptjs");

router.get('/init',async(req,res)=>{
    console.log(req.userId);
    const user=await User.findById(req.userId);

    res.send({user});
});

router.post('/register',async(req,res)=>{
    const userExists=await User.findOne({email: req.body.email});
    if(userExists){
        return res.status(400).send({
            message: 'User with this email already exist'
        });
    }

    const newUser=User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        role: 'user'
    });

    await newUser.save();

    return res.sendStatus(201);
});

router.post('/login',async(req,res)=>{
    const user=await User.findOne({email: req.body.email.toLowerCase()});
    if(!user){
        return res.status(400).send({
            message: 'User with this email does not exist'
        });
    }

    const passwordIsEqual=await bcrypt.compare(req.body.password, user.password);
    if(!passwordIsEqual){
        return res.status(401).send({
            message:'Wrong password'
        });
    }

    const token=jwt.sign({userId:user._id},'app');
    
    res.send({
        user,
        token
    })
})

module.exports=router;