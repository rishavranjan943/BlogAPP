import React, { useContext } from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const genres = ["Politics", "Sports", "Technology", "Health"];

const Navbar = () => {
  const { token, role, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const currentPath = location.pathname;
  const queryParams = new URLSearchParams(location.search);
  const currentGenre = queryParams.get("genre") || "All";

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const isHomeSelected = currentPath === "/" && currentGenre === "All";
  const isAdminSelected = currentPath === "/admin";

  return (
    <AppBar position="static" color="primary">
      <Toolbar sx={{ flexWrap: "wrap" }}>
        <Typography
          variant="h6"
          component={Link}
          to="/"
          sx={{ flexGrow: 1, textDecoration: "none", color: "inherit" }}
        >
          BlogApp
        </Typography>

        <Button
          component={Link}
          to="/"
          sx={{
            bgcolor: isHomeSelected ? "white" : "transparent",
            color: isHomeSelected ? "black" : "inherit",
            "&:hover": {
              bgcolor: isHomeSelected ? "#f0f0f0" : "rgba(255,255,255,0.08)",
            },
            m: 0.5,
          }}
        >
          Home
        </Button>

        {genres.map((g) => (
          <Button
            key={g}
            component={Link}
            to={`/?genre=${g}`}
            sx={{
              bgcolor: currentGenre === g ? "white" : "transparent",
              color: currentGenre === g ? "black" : "inherit",
              "&:hover": {
                bgcolor: currentGenre === g ? "#f0f0f0" : "rgba(255,255,255,0.08)",
              },
              m: 0.5,
            }}
          >
            {g}
          </Button>
        ))}

        {!token ? (
          <>
            <Button color="inherit" component={Link} to="/login" sx={{ m: 0.5 }}>
              Login
            </Button>
            <Button
              variant="outlined"
              color="inherit"
              component={Link}
              to="/register"
              sx={{ m: 0.5 }}
            >
              Register
            </Button>
          </>
        ) : (
          <>
            {role === "admin" && (
              <Button
                color="inherit"
                component={Link}
                to="/admin"
                sx={{
                  m: 0.5,
                  bgcolor: isAdminSelected ? "white" : "transparent",
                  color: isAdminSelected ? "black" : "inherit",
                  "&:hover": {
                    bgcolor: isAdminSelected ? "#f0f0f0" : "rgba(255,255,255,0.08)",
                  },
                }}
              >
                Admin Dashboard
              </Button>
            )}
            <Button
              variant="outlined"
              color="inherit"
              onClick={handleLogout}
              sx={{ m: 0.5 }}
            >
              Logout
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
