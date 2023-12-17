import mongoose from "mongoose";
import UserModel from "../models/user.js";

const User = UserModel;

const getUsers = async (req, res) => {
    const users = await User.find({});
    res.send(users);
};

const addToCart = async (req, res) => {
    await User.updateOne({ _id: req.body._id }, { $push: { cart: req.body.productID } });
    res.send({ success: true });
};

const removeFromCart = async (req, res) => {
    const user = await User.findOne({ _id: req.body._id });
    user.cart.splice(user.cart.indexOf(req.body.productID), 1);

    await User.findOneAndUpdate({ _id: req.body._id }, { cart: user.cart });
    res.send({ success: true });
};

const retrieveItemsFromCart = async (req, res) => {
    const cart = await User.findOne({ _id: req.body._id }, "cart")
        .populate("cart")
        .then((docs) => docs.cart);

    res.send(cart);
};

export { getUsers, addToCart, removeFromCart, retrieveItemsFromCart };
