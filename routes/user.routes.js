const express = require("express");
const router = express.Router();
const UserController = require("../controllers/user.controller");
const multer = require("multer");
const path = require("path");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/avatars/");
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const fileName = `${Date.now()}_${Math.round(Math.random() * 1e6)}${ext}`;
    cb(null, fileName);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
});

// Avatar upload route
router.post("/upload-avatar", upload.single("avatar"), UserController.uploadAvatar);
router.get("/:id", UserController.getProfileById);
router.post("/update", UserController.updateProfile); 
router.post("/change-password", UserController.changePassword);

module.exports = router;
