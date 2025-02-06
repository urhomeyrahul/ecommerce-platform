const mongoose = require("mongoose");
const User = require("../models/User");
const generateToken = require("../utils/generateToken");

const RegisterUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const userExists = await User.findOne({ email });
        if (userExists) { return res.status(400).json({ message: "User alredady exists" }) }

        const user = await User.create({
            name, email, password
        })

        if (user) {
            res.status(201).json({
                _id: user.id,
                name: user.name,
                isAdmin: user.isAdmin,
                token: generateToken(user),
            })
        }
        else {
            res.status(400).json({ message: "Invalid user details entered" })
        }
    }
    catch (error) {
        res.status(500).json({ message: "Internal Server Occured", error: error.message })
    }
}

const LoginUser = async (req, res) => {

    const { email, password } = req.body;
    const userExists = await User.findOne({ email });
    if (user && (await user.matchpassword(password))) {
        res.json({
            _id: user.id,
            email: user.email,
            name: user.name,
            isAdmin: user.isAdmin,
            token: generateToken(user.id),
        });
    }
    else {
        res.status(400).json({message: "Invalid email or password"})
    }
}

module.exports = { RegisterUser, LoginUser }