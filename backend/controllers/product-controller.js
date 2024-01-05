import mongoose from "mongoose";
import ProductModel from "../models/product.js";

const Product = ProductModel;

const getProducts = async (req, res) => {
    const products = await Product.find({});
    res.send({ products: products });
};

const addProduct = async (req, res) => {
    const id = new mongoose.Types.ObjectId();
    const newProduct = new Product({
        _id: id,
        title: req.body.title,
        name: req.body.name,
        type: req.body.type,
        imageurl: req.body.imageurl,
        price: req.body.price,
        quantity: req.body.quantity,
    });

    await newProduct.save();
    res.send({ success: true });
};

const changeQuantity = async (req, res) => {
    const productId = req.params.productID;
    const product = await Product.findOne({ _id: productId });

    await Product.findOneAndUpdate({ _id: productId }, { quantity: product.quantity - req.body.quantity });
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

const deleteProduct = async (req, res) => {
    const productId = req.params.productId;
    console.log("Deleting product with ID:", productId);

    try {
        // Use your mongoose model to find and remove the product
        const product = await Product.findOneAndDelete({ _id: productId });

        if (!product) {
            console.log("Product not found");
            res.status(404).json({ error: "Product not found" });
            return;
        }

        console.log("Product deleted successfully");
        res.json({ success: true });
    } catch (error) {
        console.error("Error deleting product:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

const getQuantity = async (req, res) => {
    const productId = req.params.productID;
    const product = await Product.findOne({ _id: productId });

    res.send({ quantity: product.quantity });
};

const restockQuantity = async (req, res) => {
    const productId = req.params.productID;
    const product = await Product.findOne({ _id: productId });

    await Product.findOneAndUpdate({ _id: productId }, { quantity: product.quantity + req.body.quantity });
    res.send({ success: true });
};

export { getProducts, addProduct, changeQuantity, updateProduct, deleteProduct, getQuantity, restockQuantity };
