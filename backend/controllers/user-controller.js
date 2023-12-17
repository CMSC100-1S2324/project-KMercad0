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
    await User.updateOne({ _id: req.body._id }, { $pull: { cart: req.body.productID } });
    res.send({ success: true });
};

const retrieveItemsFromCart = async (req, res) => {
    const cart = await User.findOne({ _id: req.body._id }, "cart")
        .populate("cart")
        .then((docs) => docs.cart);

    res.send({ success: true, cart: cart });
};

const retrieveUserName = async (req, res) => {
    const username = await User.findOne({ _id: req.body._id }, "fname lname").then(
        (docs) => `${docs.fname} ${docs.lname}`
    );
    console.log(username);

    res.send({ sucess: true, username: username });
};

const retrieveType = async (req, res) => {
    const type = await User.findOne({ _id: req.body._id }, "type").then((docs) => docs.type);
    console.log(type);

    res.send({ sucess: true, type: type });
};

export { getUsers, addToCart, removeFromCart, retrieveItemsFromCart, retrieveUserName, retrieveType };
