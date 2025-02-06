const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes.js");
const productRoutes = require("./routes/productRoutes.js");
const cartRoutes = require("./routes/cartRoutes.js");

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors);

app.use('/api/users', userRoutes);
app.use('/api/product', productRoutes);
app.use('/api/cart', cartRoutes);

app.use((err,req,res,next) => {
    res.status(500).json({message: err.message});
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port {PORT}`);
});
