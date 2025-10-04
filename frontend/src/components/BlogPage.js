import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api/api";
import { Typography, Box, Paper, Divider, CircularProgress } from "@mui/material";

const BlogPage = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      setLoading(true);
      try {
        const res = await API.get(`/blogs/${id}`);
        setBlog(res.data);
      } catch (err) {
        console.error("Failed to fetch blog");
      }
      setLoading(false);
    };
    fetchBlog();
  }, [id]);

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 5, flexDirection: "column", alignItems: "center" }}>
        <CircularProgress />
        <Typography mt={1}>Loading...</Typography>
      </Box>
    );
  }

  if (!blog) return <Typography>Blog not found</Typography>;

  return (
    <Box display="flex" justifyContent="center" mt={5} px={2}>
      <Paper sx={{ maxWidth: 900, width: "100%", p: 4, boxShadow: 3 }}>
        <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>{blog.title}</Typography>
        <Typography variant="subtitle1" color="text.secondary">
          By <strong>{blog.author.name}</strong> | Genre: {blog.genre} | Published: {new Date(blog.createdAt).toLocaleDateString()}
        </Typography>
        <Divider sx={{ my: 2 }} />
        <Box display="flex" flexDirection={{ xs: "column", md: "row" }} gap={3}>
          {blog.image && (
            <Box component="img" src={blog.image} alt={blog.title} sx={{ width: { xs: "100%", md: 250 }, height: 200, objectFit: "cover", borderRadius: 2 }} />
          )}
          <Box flex={1}>
            <Typography variant="body1" sx={{ lineHeight: 1.8, fontSize: 18 }}>{blog.body}</Typography>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default BlogPage;
