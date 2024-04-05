import mongoose from "mongoose";
import OrderModel from "../models/order.js";

const Order = OrderModel;

const getOrders = async (req, res) => {
    const orders = await Order.find({});
    res.send({ orders: orders });
};

const getUserOrders = async (req, res) => {
    const userID = req.params.userID;
    const orders = await Order.find({ userID: userID });
    res.send({ orders: orders });
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

const changeOrderStatus = async (req, res) => {
    const orderID = req.params.orderID;
    await Order.findOneAndUpdate({ _id: orderID }, { status: req.body.status });

    res.send({ success: true });
};

const getProductOfOrder = async (req, res) => {
    const orderID = req.params.orderID;
    const product = await Order.findOne({ _id: orderID }, "productID")
        .populate("productID")
        .then((docs) => docs.productID);

    res.send({ product: product });
};

const getUserOfOrder = async (req, res) => {
    const orderID = req.params.orderID;
    const user = await Order.findOne({ _id: orderID }, "userID")
        .populate("userID")
        .then((docs) => docs.userID);

    res.send({ user: user });
};

const deleteOrder = async (req, res) => {
    const orderID = req.params.orderID;

    await Order.findOneAndDelete({ _id: orderID });
    res.send({ success: true });
};

const getSoldOrders = async (req, res) => {
    const orders = await Order.find({ status: 1 });
    res.send({ orders: orders });
};

export {
    getUserOrders,
    addOrder,
    getProductOfOrder,
    changeOrderStatus,
    getOrders,
    getUserOfOrder,
    deleteOrder,
    getSoldOrders,
};
