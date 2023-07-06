import React, { useEffect } from "react";
import Header from "./Components/Header/Header";
import NavBar from "./Components/NavBar/NavBar";
import RouterComponent from "./Router";
import { Box } from "@mui/material";
import { getCurrentUserId } from "./helper";
import "./App.css";

// Create a functional component
export default function App() {
  const userId = getCurrentUserId();

  useEffect(() => {
    if (userId && window.location.pathname === "/") {
      window.location.href = "/today"; // Redirect to "/today" if user is logged in
    }
  }, []);

  return (
    <Box className="app">
      <Header />
      <Box
        sx={{
          maxHeight:
            location.pathname !== "/" && location.pathname !== "/password"
              ? "85vh"
              : "none",
          overflowY: "auto",
        }}
      >
        <RouterComponent />
      </Box>
      {location.pathname !== "/" && location.pathname !== "/password" && (
        <NavBar />
      )}
    </Box>
  );
}
