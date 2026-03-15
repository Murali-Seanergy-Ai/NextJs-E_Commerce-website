import mongoose from "mongoose";

const productsSchema = new mongoose.Schema({
     id:{type:Number},
     title:{type:String},
      price:{type:Number},
      description:{type:String},
      category:{type:String},
      image:{type:String}   

})

const Products =
  mongoose.models.products ||
  mongoose.model("products", productsSchema);

export default Products;