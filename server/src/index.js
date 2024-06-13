const express = require("express");
const cors = require("cors");
const connect = require("./config/databaseConfig");
const User = require("./model/user.model");
const app = express();

let PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

app.post("/users", async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      address,
      city,
      state,
      education,
      institution,
      graduationYear,
    } = req.body;

    if (
      !firstName ||
      !lastName ||
      !email ||
      !address ||
      !city ||
      !state ||
      !education ||
      !institution ||
      !graduationYear
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // console.log(req.body);
    const newUser = new User({
      firstName,
      lastName,
      email,
      address,
      city,
      state,
      education,
      institution,
      graduationYear,
    });

    await newUser.save();

    res
      .status(201)
      .json({ message: "User created successfully", user: newUser });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: "Failed to create user" });
  }
});

app.listen(PORT, async () => {
  await connect();
  console.log(`http://localhost:8080`);
});
