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
        quantity: req.body.quantity,
    });

    await newProduct.save();
    res.send({ success: true });
};

export { getProducts, addProduct };
