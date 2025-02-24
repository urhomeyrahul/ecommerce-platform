const User = require("../models/User");
const Product = require("../models/Product");
const Cart = require("../models/Cart");

const getCart = async (req, res) => {
    try {
        const cart = await Cart.findOne({ user: req.user.id }).populate('items.product');
        if (!cart) {
            return res.status(400).json({ message: "Cart is Empty" });
        }
        res.json(cart);
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
};

const addToCart = async (req, res) => {
    try {
        const { productId, quantity } = req.body;
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(400).json({ message: "Product not found" });
        }

        let cart = await Cart.findOne({ user: req.user.id });
        if (!cart) {
            cart = new Cart({ user: req.user.id, items: [] });
        }

        const itemIndex = cart.items.findIndex(item => item.product.toString() === productId);
        if (itemIndex >= 0) {
            cart.items[itemIndex].quantity += quantity;
        } else {
            cart.items.push({ product: productId, quantity });
        }
        await cart.save();
        res.status(201).json(cart);
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
};

const removeFromCart = async (req, res) => {
    try {
        const cart = await Cart.findOne({ user: req.user.id });
        if (!cart) {
            return res.status(400).json({ message: "Cart not found" });
        }
        cart.items = cart.items.filter(item => item.product.toString() !== req.params.id);
        await cart.save();
        res.json(cart);
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
};

module.exports = { removeFromCart, getCart, addToCart };