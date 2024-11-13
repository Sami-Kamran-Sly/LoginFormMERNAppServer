const userModel = require("../model/userModel");

const JWT = require("jsonwebtoken");
const {
  hashPassword,
  comparePassword,
} = require("../hashPassword/HashPassword");

const registerController = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validate input
    if (!name) {
      return res.status(400).send({ error: "Name is required" });
    }
    if (!email) {
      return res.status(400).send({ message: "Email is required" });
    }
    if (!password) {
      return res.status(400).send({ message: "Password is required" });
    }

    // Check if user already exists
    const exisitingUser = await userModel.findOne({ email });
    if (exisitingUser) {
      return res.status(409).send({
        success: false,
        message: "User already registered, please login",
      });
    }

    // Hash password and create user
    const hashedPassword = await hashPassword(password);
    const user = await userModel.create({
      name,
      email,
      password: hashedPassword,
    });

    res.status(201).send({
      success: true,
      message: "User registered successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Registration",
      error,
    });
  }
};

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email) {
      return res.status(400).send({ message: "Email is required" });
    }
    if (!password) {
      return res.status(400).send({ message: "Password is required" });
    }

    // Check if user exists
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found, please register",
      });
    }

    // Compare password
    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(401).send({
        success: false,
        message: "Invalid password",
      });
    }

    // Generate JWT token
    const token = JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(200).send({
      success: true,
      message: "Login successful",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Login",
      error,
    });
  }
};

module.exports = { registerController, loginController };
