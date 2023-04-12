import React from "react";
import "../../Styles/Header.css";
import {createTask} from "../../services";

const Header = () => {
  return (
    <div className="header">
      <button onClick={async () => {
        console.log("help clicked");
        const task = await createTask();
        console.log(task);
        }} className="help-button">Help</button>
    </div>
  );
};

export default Header;
