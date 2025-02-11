const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect = async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // example of json web token =  Authorization : Bearer {JWT Secret Key}
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.id).select('-password');
            next();
        } catch (error) {
            res.status(401).json({ message: "Not Authorized, token failed" });
        }
    } else {
        res.status(401).json({ message: "Not Authorized, token failed" });
    }
};

module.exports = protect;