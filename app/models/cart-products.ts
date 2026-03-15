import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: "products", required: true, unique: true },
  user:{ type:mongoose.Schema.Types.ObjectId,ref:'User',required:true},
  quantity: { type: Number, required: true, default: 1, min: 1 },
})

const CartProducts =
  mongoose.models.CartProducts || mongoose.model("CartProducts", cartSchema)

export default CartProducts