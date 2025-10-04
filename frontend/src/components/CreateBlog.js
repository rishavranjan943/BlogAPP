import React, { useState } from "react";
import { TextField, Button, Box, Typography, Paper, MenuItem } from "@mui/material";
import { useNavigate } from "react-router-dom";
import API from "../api/api";

const genres = ["Politics", "Sports", "Technology", "Health"];

const CreateBlog = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [genre, setGenre] = useState("Politics");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await API.post("/blogs", { title, body, genre, image });
      alert("Blog created successfully!");
      navigate("/");
    } catch (err) {
      alert("Failed to create blog");
    }
    setLoading(false);
  };

  return (
    <Box display="flex" justifyContent="center" mt={5}>
      <Paper sx={{ p: 4, width: 400 }}>
        <Typography variant="h5" gutterBottom>CREATE BLOG</Typography>
        <form onSubmit={handleSubmit}>
          <TextField fullWidth label="Title" margin="normal" value={title} onChange={e => setTitle(e.target.value)} required />
          <TextField fullWidth label="Body" margin="normal" multiline rows={4} value={body} onChange={e => setBody(e.target.value)} required />
          <TextField select fullWidth label="Genre" margin="normal" value={genre} onChange={e => setGenre(e.target.value)}>
            {genres.map((g) => <MenuItem key={g} value={g}>{g}</MenuItem>)}
          </TextField>
          <TextField fullWidth label="Image URL" margin="normal" value={image} onChange={e => setImage(e.target.value)} required />
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 2 }} disabled={loading}>
            {loading ? "Submitting..." : "Submit"}
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default CreateBlog;
