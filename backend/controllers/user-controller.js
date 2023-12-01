import mongoose from "mongoose";
import UserModel from "../models/user.js";

const User = UserModel;

const getUsers = async (req, res) => {
    const users = await User.find({});
    res.send(users);
};

export { getUsers };
