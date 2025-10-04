const express = require("express");
const Blog = require("../models/blog");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");

const router = express.Router();


router.get("/", auth, async (req, res) => {
  const { genre, page = 1, limit = 6 } = req.query;

  const filter = {};
  if (genre && genre !== "All") filter.genre = genre;

  const blogs = await Blog.find(filter)
    .skip((page - 1) * limit)
    .sort({ updatedAt: -1, createdAt: -1 })
    .limit(Number(limit))
    .populate("author", "name email");

  const total = await Blog.countDocuments(filter);

  res.json({
    blogs,
    total,
    page: Number(page),
    pages: Math.ceil(total / limit),
  });
});




router.get("/:id", auth, async (req, res) => {
  const blog = await Blog.findById(req.params.id).populate("author", "name email");
  if (!blog) return res.status(404).json({ message: "Blog not found" });
  res.json(blog);
});



router.post("/", auth, admin, async (req, res) => {
  const { title, body, genre,image } = req.body;
  const blog = new Blog({
    title,
    body,
    genre,
    author: req.user.id,
    image
  });
  await blog.save();
  res.json(blog);
});


router.put("/:id", auth, admin, async (req, res) => {
  const blog = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(blog);
});


router.delete("/:id", auth, admin, async (req, res) => {
  await Blog.findByIdAndDelete(req.params.id);
  res.json({ message: "Blog deleted" });
});

module.exports = router;
