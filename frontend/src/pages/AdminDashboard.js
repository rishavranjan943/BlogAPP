import React, { useState, useEffect } from "react";
import API from "../api/api";
import { Box, Typography, Card, CardContent, CardMedia, CardActionArea, Button, Stack, TextField, MenuItem, CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";

const genres = ["All", "Politics", "Sports", "Technology", "Health"];

const AdminDashboard = () => {
  const [blogs, setBlogs] = useState([]);
  const [filter, setFilter] = useState("All");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const query = filter !== "All" ? `?genre=${filter}&page=${page}&limit=6` : `?page=${page}&limit=6`;
      const res = await API.get(`/blogs${query}`);
      setBlogs(res.data.blogs || []);
      setTotalPages(res.data.pages || 1);
    } catch (err) {
      console.error(err);
      setBlogs([]);
      setTotalPages(1);
    }
    setLoading(false);
  };

  useEffect(() => { fetchBlogs(); }, [filter, page]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this blog?")) return;
    try {
      await API.delete(`/blogs/${id}`);
      setBlogs(blogs.filter((b) => b._id !== id));
      alert("Blog deleted successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to delete blog");
    }
  };

  if (loading) return (
    <Box sx={{ display: "flex", justifyContent: "center", mt: 5, flexDirection: "column", alignItems: "center" }}>
      <CircularProgress />
      <Typography mt={1}>Loading...</Typography>
    </Box>
  );

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2, flexWrap: "wrap" }}>
        <TextField select label="Filter by Genre" value={filter} onChange={(e) => { setFilter(e.target.value); setPage(1); }} sx={{ minWidth: 200 }}>
          {genres.map((g) => <MenuItem key={g} value={g}>{g}</MenuItem>)}
        </TextField>
        <Button variant="contained" onClick={() => navigate("/create-blog")}>Create New Blog</Button>
      </Box>

      {blogs.length === 0 ? <Typography>No blogs found</Typography> : (
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, justifyContent: blogs.length === 1 ? "flex-start" : "center" }}>
          {blogs.map((blog) => (
            <Card key={blog._id} sx={{ width: 300 }}>
              <CardActionArea onClick={() => navigate(`/blog/${blog._id}`)}>
                <CardMedia component="img" height="140" image={blog.image} alt={blog.title} />
                <CardContent>
                  <Typography variant="h6">{blog.title}</Typography>
                  <Typography variant="body2">{blog.body.substring(0, 80)}...</Typography>
                  <Typography variant="caption" color="gray">Genre: {blog.genre}</Typography>
                </CardContent>
              </CardActionArea>

              <Box sx={{ display: "flex", justifyContent: "space-between", p: 1 }}>
                <Button size="small" onClick={() => navigate(`/edit-blog/${blog._id}`)}>Edit</Button>
                <Button size="small" color="error" onClick={() => handleDelete(blog._id)}>Delete</Button>
              </Box>
            </Card>
          ))}
        </Box>
      )}

      {totalPages > 1 && (
        <Stack direction="row" spacing={1} justifyContent="center" flexWrap="wrap" gap={1} sx={{ mt: 3 }}>
          {Array.from({ length: totalPages }, (_, i) => (
            <Button key={i + 1} variant={page === i + 1 ? "contained" : "outlined"} onClick={() => setPage(i + 1)} size="small">{i + 1}</Button>
          ))}
        </Stack>
      )}
    </Box>
  );
};

export default AdminDashboard;
