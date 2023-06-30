const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
// Get user registeration
// Route: POST /api/user/register
// Access: Public
const registerUser = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        res.status(400);
        throw new Error("enter correct information");
    }
    const userAvailable = await User.findOne({ email });
    if (userAvailable) {
        res.status(404);
        throw new Error("user already available");
    }
    const hashedPasword = await bcrypt.hash(password, 10);
    //console.log("Hashed pasword ",hashedPasword);
    const user = await User.create({
        username,
        email,
        password: hashedPasword,
    });
    console.log(`user created ${user}`);
    if (user) {
        res.status(201).json({ _id: user.id, name: user.username, email: user.email })
    }
    res.json({ message: "registration successfull" });
});


// Get user login
// Route: POST /api/user/login
// Access: Public
const loginUser = asyncHandler(async (req, res) => {
    //res.json({ message: "login successfull" });
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400);
        throw new Error("enter correct information");
    };
    const user = await User.findOne({ email });
    if (user && await bcrypt.compare(password, user.password)) {
        const accessToken = jwt.sign({
            user: {
                username: user.username,
                email: user.email,
                id: user.id,
            },
        },
            process.env.ACCESS_SECRET_TOKEN,
            { expiresIn: "15m" });
            res.status(200).json({accessToken}); 
    }
    else{
        res.status(401);
        throw new Error("Password or email not matching");
    }
    
});

// Get user registeration
// Route: GET /api/user/current
// Access: Public
const currentUser = asyncHandler(async (req, res) => {
    res.json(req.user);
});
module.exports = { registerUser, loginUser, currentUser };