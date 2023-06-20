import React from "react";
import "../../Styles/Header.css";
import { createTask } from "../../services";

const Header = () => {
  return (
    <div className="header">
      <button
        onClick={async () => {
          alert("Help button is currently under construction.");
        }}
        className="help-button"
      >
        Help
      </button>
    </div>
  );
};

export default Header;
