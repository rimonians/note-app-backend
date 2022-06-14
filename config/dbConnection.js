const mongoose = require("mongoose");

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.DB_CONNECTION_STRING);
    console.log("Database successfully connected");
  } catch (err) {
    console.log(err);
  }
};

module.exports = dbConnection;
