import React, { useEffect } from "react";
import Header from "./Components/Header/Header";
import NavBar from "./Components/NavBar/NavBar";
import RouterComponent from "./Router";
import { Box } from "@mui/material";
import "./App.css";

// Create a functional component
export default function App() {
  const userId = localStorage.getItem("userId");
  var pattern = /^\/passwordReset/;

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
          !pattern.test(window.location.pathname) && location.pathname !== "/" && location.pathname !== "/password" && location.pathname !== "/passwordreset"
              ? "85vh"
              : "none",
          overflowY: "auto",
        }}
      >
        <RouterComponent />
      </Box>
      {!pattern.test(window.location.pathname) && location.pathname !== "/" && location.pathname !== "/password" && location.pathname !== "/passwordreset" && (
        <NavBar />
      )}
    </Box>
  );
}
