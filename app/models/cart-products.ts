import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    productId:{type:mongoose.Types.ObjectId,ref:"products"},
    quantity:{type:Number}

})