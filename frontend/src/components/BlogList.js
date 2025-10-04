import React, { useEffect, useState } from "react";
import API from "../api/api";
import {
  Box,
  Typography,
  Card,
  CardMedia,
  CardActionArea,
  Button,
  Stack,
  CircularProgress,
} from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const genre = queryParams.get("genre") || "All";

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const query = `?genre=${genre}&page=${page}&limit=6`;
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

  useEffect(() => {
    setPage(1); 
  }, [genre]);

  useEffect(() => {
    fetchBlogs();
  }, [genre, page]);

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 5, flexDirection: "column", alignItems: "center" }}>
        <CircularProgress />
        <Typography mt={1}>Loading...</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      {blogs.length === 0 ? (
        <Typography>No blogs found</Typography>
      ) : (
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, justifyContent: blogs.length === 1 ? "flex-start" : "center" }}>
          {blogs.map((blog) => (
            <Card key={blog._id} sx={{ width: 300 }}>
              <CardActionArea onClick={() => navigate(`/blog/${blog._id}`)}>
                <CardMedia component="img" height="140" image={blog.image} alt={blog.title} />
                <Box sx={{ p: 1 }}>
                  <Typography variant="h6">{blog.title}</Typography>
                  <Typography variant="body2">{blog.body.substring(0, 80)}...</Typography>
                  <Typography variant="caption" color="gray">Genre: {blog.genre}</Typography>
                </Box>
              </CardActionArea>
            </Card>
          ))}
        </Box>
      )}

      {totalPages > 1 && (
        <Stack direction="row" spacing={1} justifyContent="center" flexWrap="wrap" gap={1} sx={{ mt: 3 }}>
          {Array.from({ length: totalPages }, (_, i) => (
            <Button key={i + 1} variant={page === i + 1 ? "contained" : "outlined"} onClick={() => setPage(i + 1)} size="small">
              {i + 1}
            </Button>
          ))}
        </Stack>
      )}
    </Box>
  );
};

export default BlogList;
