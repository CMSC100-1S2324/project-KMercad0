import mongoose from "mongoose";
import OrderModel from "../models/order.js";

const Order = OrderModel;

const getOrders = async (req, res) => {
    const orders = await Order.find({ userID: req.body._id });
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

const changeOrderStatus = async (req, res) => {
    await Order.findOneAndUpdate({ _id: req.body._id }, { status: req.body.status });

    res.send({ success: true });
};

export { getOrders, addOrder, getOrderProduct, changeOrderStatus };
