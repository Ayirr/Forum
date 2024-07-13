const mongoose = require("mongoose");
const bcrypt=require("bcryptjs");
const Schema=mongoose.Schema;

const CategorySchema=new mongoose.Schema({
    name: String,


    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',  // Reference to User model
        required: true  // Make it a required field
    }

    
},{
    timestamps:true
});

const Category=mongoose.model('Category',CategorySchema);
module.exports=Category;