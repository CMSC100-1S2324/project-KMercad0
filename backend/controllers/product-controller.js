import mongoose from "mongoose";
import ProductModel from "../models/product.js";

const Product = ProductModel;

const getProducts = async (req, res) => {
    const products = await Product.find({});
    res.send(products);
};

const addProduct = async (req, res) => {
    const id = new mongoose.Types.ObjectId();
    const newProduct = new Product({
        _id: id,
        title: req.body.title,
        name: req.body.name,
        type: req.body.type,
        price: req.body.price,
        quantity: req.body.quantity,
    });

    await newProduct.save();
    res.send({ success: true });
};

const updateQuantity = async (req, res) => {
    const product = await Product.findOne({ _id: req.body._id });
    let quantity = product.quantity + req.body.number;

    await Product.findOneAndUpdate({ _id: req.body._id }, { quantity: quantity });
    res.send({ success: true });
};

export { getProducts, addProduct, updateQuantity };
