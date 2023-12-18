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

const updateProduct = async (req, res) => {
    try {
        const productId = req.params.productId;
        const updatedProductData = req.body;

        // Implement logic to find the product by ID and update its properties
        // Example using Mongoose:
        const product = await Product.findOneAndUpdate({ _id: productId }, updatedProductData, { new: true });

        res.json({ success: true, updatedProduct: product });
    } catch (error) {
        console.error("Error updating product:", error);
        res.status(500).json({ success: false, error: "Internal Server Error" });
    }
};

export { getProducts, addProduct, updateQuantity, updateProduct};
