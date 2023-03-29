import React from "react";
import Header from "./Components/Header/Header";
import NavBar from "./Components/NavBar/NavBar";
import RouterComponent from "./Router";
import "./App.css";

// Create a functional component
export default function App() {
  return (
    <div>
      <Header />
      <RouterComponent />
      <div className="navBar">
        <NavBar />
      </div>
    </div>
  );
}
