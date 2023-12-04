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

const removefromCart = async (req, res) => {
    await User.updateOne({ _id: req.body._id }, { $pull: { cart: req.body.productID } });
    res.send({ success: true });
};

export { getUsers, addToCart, removefromCart };
