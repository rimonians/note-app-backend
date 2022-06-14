// Import external module
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// User controller
const userController = {};

// Import user model
const User = require("../models/userModel");

// Signup user
userController.signup = async (req, res, next) => {
  try {
    const data = req.body;
    const hashedPassword = await bcrypt.hash(data.password, 5);
    const finalData = { ...data, password: hashedPassword };
    const newUser = new User(finalData);
    await newUser.save();
    res.status(201).json({ message: "Signup successfull" });
  } catch (err) {
    next(err);
  }
};

// Signin user
userController.signin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (user) {
      const comparePassword = await bcrypt.compare(password, user.password);
      if (comparePassword) {
        const payload = {
          _id: user._id,
          username: user.username,
          email: user.email,
        };
        const token = jwt.sign(payload, process.env.JWT_SECRET);
        res.status(200).json({ message: "Authentication successfull", token });
      } else {
        res.status(401).json({ message: "Authentication failed" });
      }
    } else {
      res.status(500).json({ message: "Authentication failed" });
    }
  } catch (err) {
    next(err);
  }
};

// Export user controller
module.exports = userController;
