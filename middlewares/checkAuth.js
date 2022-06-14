// Import external module
const jwt = require("jsonwebtoken");

// Check auth middleware
const checkAuth = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    const token = authorization.split(" ")[1];
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    req.payload = decode;
    next();
  } catch (err) {
    err.message = "Authentication failed";
    next(err);
  }
};

// Export check auth middleware
module.exports = checkAuth;
