import React from "react";
import Header from "./Components/Header/Header";
import NavBar from "./Components/NavBar/NavBar";
import RouterComponent from "./Router";
import { Box } from "@mui/material";
import "./App.css";

// Create a functional component
export default function App() {
  return (
    <Box className="app">
      <Header />
      <Box className="main-page">
        <RouterComponent />
      </Box>
      <NavBar />
    </Box>
  );
}
