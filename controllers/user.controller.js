const UserModel = require("../models/user.model");
const bcrypt = require("bcrypt");

exports.getProfileById = async (req, res) => {
  try {
    const user = await UserModel.getById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Error fetching user", error: err.message });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const {id, name, phone } = req.body;
    await UserModel.updateProfile({ id,name, phone });
    res.json({ message: "Profile updated" });
  } catch (err) {
    res.status(500).json({ message: "Error updating profile", error: err.message });
  }
};
exports.uploadAvatar = async (req, res) => {
  try {
    const { id } = req.body;
    const file = req.file;

    if (!id || !file) {
      return res.status(400).json({ message: "User ID and avatar file required" });
    }

    const avatarUrl = `/uploads/avatars/${file.filename}`;
    await UserModel.updateAvatar(id, avatarUrl);

    res.json({ message: "Avatar uploaded", avatar: avatarUrl });
  } catch (err) {
    res.status(500).json({ message: "Error uploading avatar", error: err.message });
  }
};

exports.changePassword = async (req, res) => {
  try {
    const {id, password } = req.body;
    if (!password) return res.status(400).json({ message: "Password required" });

    const hash = await bcrypt.hash(password, 10);
    await UserModel.updatePassword(req.body.id, hash);
    res.json({ message: "Password updated" });
  } catch (err) {
    res.status(500).json({ message: "Error changing password", error: err.message });
  }
};
