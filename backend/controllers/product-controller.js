import mongoose from "mongoose";
import ProductModel from "../models/product.js";

const Product = ProductModel;

const getProducts = async (req, res) => {
    const products = await Product.find({});
    res.send(products);
};

export { getProducts };
