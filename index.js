// Import external module
require("dotenv").config();
const express = require("express");
const cors = require("cors");

// Import dabatase connection function
const dbConnection = require("./config/dbConnection");

// Import routes
const authRoute = require("./routes/authRoute");
const userRoute = require("./routes/userRoute");
const budgetRoute = require("./routes/budgetRoute");

// Import not found & error handling middleware
const notFound = require("./middlewares/notFound");
const errorHandling = require("./middlewares/errorHandling");

// Establish database connection
dbConnection();

// Define PORT
const PORT = process.env.PORT || 3000;

// Initialize app
const app = express();

// Enable cors
app.use(cors());

// Use static folder
app.use(express.static("public"));

// Parse request
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Use routes
app.use("/auth", authRoute);
app.use("/user", userRoute);
app.use("/budget", budgetRoute);

// Use not found & error handling middleware
app.use(notFound);
app.use(errorHandling);

// Listening to the app
app.listen(PORT, (err) => {
  if (!err) console.log(`Server successfully running at port ${PORT}`);
});
