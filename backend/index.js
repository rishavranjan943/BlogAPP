const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./db");
const path = require("path");
const cors = require("cors");

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

// API routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/blogs", require("./routes/blog"));

// Serve frontend build
app.use(express.static(path.join(__dirname, "../frontend/build")));

// Catch-all route for React
app.get(/.*/, (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/build", "index.html"));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
