import React, { useState, useEffect } from "react";
import { TextField, Button, Box, Typography, Paper, MenuItem, CircularProgress } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import API from "../api/api";

const genres = ["Politics", "Sports", "Technology", "Health"];

const EditBlog = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [genre, setGenre] = useState("Politics");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlog = async () => {
      setLoading(true);
      try {
        const res = await API.get(`/blogs/${id}`);
        setTitle(res.data.title);
        setBody(res.data.body);
        setGenre(res.data.genre);
        setImage(res.data.image);
      } catch (err) {
        console.error("Failed to fetch blog");
      }
      setLoading(false);
    };
    fetchBlog();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await API.put(`/blogs/${id}`, { title, body, genre, image });
      alert("Blog updated successfully!");
      navigate("/");
    } catch (err) {
      alert("Failed to update blog");
    }
    setSaving(false);
  };

  if (loading) return (
    <Box sx={{ display: "flex", justifyContent: "center", mt: 5, flexDirection: "column", alignItems: "center" }}>
      <CircularProgress />
      <Typography mt={1}>Loading...</Typography>
    </Box>
  );

  return (
    <Box display="flex" justifyContent="center" mt={5}>
      <Paper sx={{ p: 4, width: 400 }}>
        <Typography variant="h5" gutterBottom>EDIT BLOG</Typography>
        <form onSubmit={handleSubmit}>
          <TextField fullWidth label="Title" margin="normal" value={title} onChange={e => setTitle(e.target.value)} required />
          <TextField fullWidth label="Body" margin="normal" multiline rows={4} value={body} onChange={e => setBody(e.target.value)} required />
          <TextField select fullWidth label="Genre" margin="normal" value={genre} onChange={e => setGenre(e.target.value)}>
            {genres.map((g) => <MenuItem key={g} value={g}>{g}</MenuItem>)}
          </TextField>
          <TextField fullWidth label="Image URL" margin="normal" value={image} onChange={e => setImage(e.target.value)} required />
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 2 }} disabled={saving}>
            {saving ? "Updating..." : "Update"}
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default EditBlog;
