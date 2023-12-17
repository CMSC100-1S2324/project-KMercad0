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
        price: req.body.price,
        status: req.body.status,
        userID: req.body.userID,
        dateOrdered: req.body.dateOrdered,
    });

    await newOrder.save();
    res.send({ success: true });
};

const getOrderProduct = async (req, res) => {
    const product = await Order.findOne({ _id: req.body._id }, "productID")
        .populate("productID")
        .then((docs) => docs.productID);

    res.send(product);
};

export { getOrders, addOrder, getOrderProduct };
