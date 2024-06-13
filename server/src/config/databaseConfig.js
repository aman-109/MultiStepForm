require("dotenv").config();
const mongoose = require("mongoose");

const connect = async () => {
  return await mongoose.connect(process.env.MONGODB_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });
};
module.exports = connect;
