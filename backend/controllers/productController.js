const Product = require("../models/Product");

const createProduct = async (req, res) => {
    const { name, price, description, stock, category } = req.body;

    const product = new Product({
        name, price, description, stock, category
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
};

const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find({});
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: "server error" });
    }
};

const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.json(product);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

const updateProduct = async (req, res) => {
    const { name, price, description, stock, category } = req.body;

    const productExists = await Product.findOne({ name });
    if (productExists) {
        res.status(201).json({
            name: productExists.name,
            price: productExists.price,
            description: productExists.description,
            stock: productExists.stock,
            category: productExists.category,
        });
    } else {
        res.status(404).json({ message: "Product not found" });
    }
};

const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        await product.deleteOne();
        res.json({ message: "Product successfully removed" });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = {
    createProduct, getAllProducts,
    getProductById, updateProduct,
    deleteProduct
};