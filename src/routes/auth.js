const express = require("express");
const authRouter = express.Router();
const bcrypt = require("bcrypt");

const { validateSignUpData } = require("../utils/validation");
const User = require("../models/user");

// === SIGNUP ===
authRouter.post("/signup", async (req, res) => {
  try {
    // Validate request data
    validateSignUpData(req);

    const { firstName, lastName, emailId, password } = req.body;

    // Hash the password
    const passwordHash = await bcrypt.hash(password, 10);

    // Create and save user
    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
    });

    const savedUser = await user.save();
    const token = await savedUser.getJWT();

    // Set token in secure cookie
    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "None",
      secure: true,
      expires: new Date(Date.now() + 8 * 3600000), // 8 hours
    });

    res.json({ message: "User added successfully!", data: savedUser });
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

// === LOGIN ===
authRouter.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;

    const user = await User.findOne({ emailId });
    if (!user) {
      throw new Error("Invalid credentials");
    }

    const isPasswordValid = await user.validatePassword(password);
    if (!isPasswordValid) {
      throw new Error("Invalid credentials");
    }

    const token = await user.getJWT();

    // Set token in secure cookie
    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "None",
      secure: true,
      expires: new Date(Date.now() + 8 * 3600000),
    });

    res.send(user);
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

// === LOGOUT ===
authRouter.post("/logout", async (req, res) => {
  res.cookie("token", null, {
    httpOnly: true,
    sameSite: "None",
    secure: true,
    expires: new Date(Date.now()),
  });
  res.send("Logout successful!");
});

module.exports = authRouter;
