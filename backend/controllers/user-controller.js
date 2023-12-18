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
    try {
        const user = await User.findOne({ _id: req.body._id }).populate("cart");
        
        if (!user) {
            return res.status(404).send({ error: "User not found" });
        }

        const cart = user.cart || []; // Ensure cart is an array

        res.send(cart);
    } catch (error) {
        console.error("Error retrieving items from cart:", error);
        res.status(500).send({ error: "Internal Server Error" });
    }
};


const getCartTotalPrice = async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.body._id }).populate("cart");

        if (!user) {
            return res.status(404).send({ error: "User not found" });
        }

        const cart = user.cart || []; // Ensure cart is an array

        let total = 0;
        cart.forEach((item) => {
            total += item.price || 0; // Ensure item.price is a number
        });

        res.send({ total: total });
    } catch (error) {
        console.error("Error calculating cart total price:", error);
        res.status(500).send({ error: "Internal Server Error" });
    }
};

const removeAllFromCart = async (req, res) => {
    await User.updateOne({ _id: req.body._id }, { $set: { cart: [] } });
    res.send({ success: true });
};

export { getUsers, addToCart, removeFromCart, retrieveItemsFromCart, getCartTotalPrice, removeAllFromCart };
