require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
app.use(cors({
  origin: '*',
}));
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
app.use("/api/auth", require("./routes/auth.routes"));
app.use("/", require("./routes/quizz.routes"));
app.use( "/api/users" ,require("./routes/user.routes"));

// Start server
const PORT = process.env.PORT || 5001;
app.listen(PORT,'0.0.0.0',() => console.log(`Server running on port ${PORT}`));
z