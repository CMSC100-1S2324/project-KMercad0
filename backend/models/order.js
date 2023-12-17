import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
    _id: { type: mongoose.Types.ObjectId, required: true },
    productID: { type: mongoose.Types.ObjectId, ref: "Product", required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
    status: { type: Number, required: true },
    userID: { type: mongoose.Types.ObjectId, ref: "User", required: true },
    dateOrdered: { type: Date, default: Date.now, required: true },
});

const OrderModel = mongoose.model("Order", OrderSchema);
export default OrderModel;
