const express = require("express")
const router=express.Router();
const Category = require("../models/category");
const mongoose = require('mongoose')
const protected=require('../middleware/protected')

router.post('/create',protected,async(req,res)=>{
    // try {
    //     const { name } = req.body;
    //     const category = new Category({ name });
    //     await category.save();
    //     res.status(201).json({ id: category._id, name: category.name });
    // } catch (error) {
    //     console.error('Error creating category:', error);
    //     res.status(500).json({ message: 'Failed to create category' });
    // }


    try {
        // Fetch the username based on the userId from the token
        const user = await User.findById(req.userId).select('username');
        if (!user) {
            return res.status(404).send('User not found');
        }

        const category = new Category({
            name: req.body.name,
            user: req.userId  // Set the userId to the category
        });

        await category.save();
        const populatedCategory = await Category.findById(category._id).populate('user', 'username');
        res.send({ id: populatedCategory._id, name: populatedCategory.name, user: user.username });
    } catch (error) {
        res.status(500).send(error);
    }
});

router.get('/',async(req,res)=>{
    // const categories = await Category.find();
    // res.send(categories);
    try {
        const categories = await Category.find().populate('user', 'username').exec;
        res.send(categories);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.get('/:id',async(req,res)=>{
    if (!mongoose.Types.ObjectId.isValid(req.params.id)){
        return res.sendStatus(404)
    }

    // const category=await Category.findById(req.params.id);
    // res.send(category);
    try {
        const category = await Category.findById(req.params.id).populate('user', 'username');
        if (!category) {
            return res.sendStatus(404);
        }
        res.send(category);
    } catch (error) {
        res.status(500).send(error);
    }
})

module.exports=router;