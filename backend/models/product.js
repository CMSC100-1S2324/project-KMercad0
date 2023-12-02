import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
    _id: { type: mongoose.Types.ObjectId, required: true },
    title: { type: String, required: true },
    name: { type: String, required: true },
    type: { type: String, required: true },
    quantity: { type: String, required: true },
});

const ProductModel = mongoose.model("Product", ProductSchema);
export default ProductModel;
