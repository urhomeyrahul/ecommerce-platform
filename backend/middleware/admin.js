const user = require("../models/User");
const admin = async (req, res, next) => {

    if (req.user && req.user.isAdmin) next();
    else res.status(401).json({ message: "Not authorized as user" });
}

module.exports = admin;