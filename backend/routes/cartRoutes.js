const express = require("express");
const { getCart, addToCart, removeFromCart } = require("../controller/cartController");
const { protect } = require("../middleware/auth");

const router = express.Router();

router.get('/', protect, getCart);
router.post('/', protect, addToCart);
router.delete('/:id', protect, removeFromCart);

module.exports = router;