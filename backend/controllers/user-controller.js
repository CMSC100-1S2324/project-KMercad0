import mongoose from "mongoose";
import UserModel from "../models/user.js";

const User = UserModel;

const getUsers = async (req, res) => {
    const users = await User.find({});
    res.send(users);
};

const addUser = async (req, res) => {
    const id = new mongoose.Types.ObjectId();
    const newUser = new User({
        _id: id,
        fname: req.body.fname,
        mname: req.body.mname,
        lname: req.body.lname,
        type: req.body.type,
        email: req.body.email,
        password: req.body.password,
        cart: [],
    });

    await newUser.save();
    res.send({ success: true });
};

const addToCart = async (req, res) => {
    await User.updateOne({ _id: req.body._id }, { $push: { cart: req.body.productID } });
    res.send({ success: true });
};

const removefromCart = async (req, res) => {
    await User.updateOne({ _id: req.body._id }, { $pull: { cart: req.body.productID } });
    res.send({ success: true });
};

export { getUsers, addUser, addToCart, removefromCart };
