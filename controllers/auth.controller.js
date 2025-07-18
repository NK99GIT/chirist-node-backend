const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const UserModel = require("../models/auth.model");

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.findByEmail(email);
    if (!user) return res.status(400).json({ message: "Invalid email" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid password" });

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    return res.status(200).json({ token, id:user.id , user});
  } catch (err) {
    return res.status(500).json({ message: "Server error", error: err.message });
  }
};


exports.register = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user already exists
    const existingUser = await UserModel.findByEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPwd = await bcrypt.hash(password, salt);

    // Insert user into DB
    const user = await UserModel.create({ email, password: hashedPwd });

    // Create token
    const token = jwt.sign({ id: user.insertId }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    return res.status(201).json({ token });
  } catch (err) {
    return res.status(500).json({ message: "Server error", error: err.message });
  }
};