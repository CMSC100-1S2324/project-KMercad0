import mongoose from "mongoose";
import UserModel from "../models/user.js";

const User = UserModel;

const getUsers = async (req, res) => {
    const users = await User.find({});
    res.send(users);
};

const addToCart = async (req, res) => {
    const userID = req.params.userID;
    await User.updateOne({ _id: userID }, { $push: { cart: req.body.productID } });
    res.send({ success: true });
};

const removeFromCart = async (req, res) => {
    const userID = req.params.userID;
    const user = await User.findOne({ _id: userID });
    user.cart.splice(user.cart.indexOf(req.body.productID), 1);

    await User.findOneAndUpdate({ _id: userID }, { cart: user.cart });
    res.send({ success: true });
};

const getItemsFromCart = async (req, res) => {
    const userID = req.params.userID;
    const cart = await User.findOne({ _id: userID }, "cart")
        .populate("cart")
        .then((docs) => docs.cart);

    res.send({ cart: cart });
};

const getCartTotalPrice = async (req, res) => {
    const userID = req.params.userID;
    const cart = await User.findOne({ _id: userID }, "cart")
        .populate("cart")
        .then((docs) => docs.cart);

    let total = 0;
    cart.forEach((item) => {
        total += item.price;
    });

    res.send({ total: total });
};

const removeAllFromCart = async (req, res) => {
    const userID = req.params.userID;
    await User.updateOne({ _id: userID }, { $set: { cart: [] } });
    res.send({ success: true });
};

const getAllUserAccounts = async (req, res) => {
    const users = await User.find({ type: "user" });
    res.send({ users: users });
};

export {
    getUsers,
    addToCart,
    removeFromCart,
    getItemsFromCart,
    getCartTotalPrice,
    removeAllFromCart,
    getAllUserAccounts,
};
