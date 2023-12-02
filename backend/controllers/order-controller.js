import mongoose from "mongoose";
import OrderModel from "../models/order.js";

const Order = OrderModel;

const getOrders = async (req, res) => {
    const orders = await Order.find({});
    res.send(orders);
};

const addOrder = async (req, res) => {
    const id = new mongoose.Types.ObjectId();
    const newOrder = new Order({
        _id: id,
        productID: req.body.productID,
        quantity: req.body.quantity,
        status: req.body.status,
        email: req.body.email,
        dateOrdered: req.body.dateOrdered,
    });

    await newOrder.save();
    res.send({ success: true });
};

export { getOrders, addOrder };
