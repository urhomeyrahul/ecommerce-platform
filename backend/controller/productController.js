const mongoose = require("mongoose");
const Product = require("../models/Product");

const createProduct = async (req, res) => {

    const { name, price, description, stock, category } = req.body;

    const product = new Product({
        name, price, description, stock, category
    })

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
}

const getAllProducts = async (req, res) => {

    try {
        const products = await Product.find({});
        res.json(products);
    }
    catch (error) {
        res.json(500).json({ message: "server eroor" });
    }

}

const getProductById = async (req, res) => {

    try {
        const product = product.findById(req.param.id);

    }
    catch (error) {
        res.status(500).json({ message: "Server error" });
    }

}

const updateProduct = async (req, res) => {

    const { name, price, description, stock, category } = req.body;

    const productExists = await Product.findOne({ name });
    if (product) {
        res.status(201).json({
            name: product.name,
            price: product.price,
            description: product.description,
            stock: product.stock,
            category: product.category,
        })
    }

}

const deleteProduct = async (req, res) => {

    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            req.status(404).json({ message: " Product not found" });
        }
        await product.deleteOne();
        res.json({ message: "product successfully removed" })
    }
    catch (error) {
        res.status(500).json({ message: "internal server error" });
    }

}