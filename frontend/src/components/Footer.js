import React from "react";
import { Box, Typography, Link } from "@mui/material";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 2,
        px: 3,
        mt: "auto",              
        backgroundColor: "#1976d2", 
        color: "white",
        textAlign: "center",
      }}
    >
      <Typography variant="body2">
        &copy; {new Date().getFullYear()} My Blog App. All rights reserved.
      </Typography>
      <Typography variant="body2">
        <Link  color="inherit" underline="hover">
          Privacy Policy
        </Link>{" "}
        |{" "}
        <Link  color="inherit" underline="hover">
          Terms of Service
        </Link>
      </Typography>
    </Box>
  );
};

export default Footer;
