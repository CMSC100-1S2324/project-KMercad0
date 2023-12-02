import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
    _id: { type: mongoose.Types.ObjectId, required: true },
    productID: { type: mongoose.Types.ObjectId, required: true },
    quantity: { type: Number, required: true },
    status: { type: Number, required: true },
    email: { type: String, required: true },
    dateOrdered: { type: Date, required: true },
});

const OrderModel = mongoose.model("Order", OrderSchema);
export default OrderModel;
