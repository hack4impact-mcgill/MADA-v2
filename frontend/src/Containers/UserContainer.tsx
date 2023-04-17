import React from "react";
import "../Styles/User.css";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

// using dummy values for user details.
// to be replaced with actual values with API Requests

const User = () => {
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate("/user");
  };

  return (
    <Box className="user-container">
      <Box className="User">
        <h2 className="VolunteerName">John Doe</h2>
        <h3 className="Volunteer">Volunteer</h3>
        <Box className="initials"></Box>
      </Box>
      <Box className="details">
        <Box className="account-edit">
          <h4 className="account">Account</h4>
          <button className="edit-profile-button" onClick={handleEdit}>
            Edit Profile
          </button>
        </Box>
        <hr className="divider"></hr>
        <Box className="Username">
          <label className="username">Username: </label>
          <span className="usernameValue">JohnDoe123</span>
        </Box>
        <Box className="Email">
          <label className="email">Email: </label>
          <span className="emailValue">johndoe@example.com</span>
        </Box>
        <h4 className="Contact">Contact</h4>
        <hr className="divider"></hr>
        <Box className="PhoneNumber">
          <label className="phoneNumber">Primary Phone Number: </label>
          <span className="phoneNumberValue">(123) 456-7890</span>
        </Box>
        <Box className="PhoneNumber">
          <label className="phoneNumber">Other Phone Number: </label>
          <span className="phoneNumberValue">(123) 456-7890</span>
        </Box>
        <Box className="PhoneNumber">
          <label className="phoneNumber">Other Phone Number: </label>
          <span className="phoneNumberValue">(123) 456-7890</span>
        </Box>
        {/* <Box className="NewNumbers">
          <label className="newNumberLabel">New Phone Numbers</label>
          {newNumbers.map((number, index) => {
            return (
              <span key={index} className="newNumberValue">
                {number}
              </span>
            );
          })}
          <span className="newNumberValue">{newNumber}</span>
        </Box> */}
      </Box>
    </Box>
  );
};
export default User;
