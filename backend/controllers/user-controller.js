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
    });

    await newUser.save();
    res.send({ success: true });
};

export { getUsers, addUser };
