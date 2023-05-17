import React, { useEffect, useState } from "react";
import "../Styles/UserProfile.css";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";

const UserProfileContainer = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [validEmail, setValidEmail] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [validPhoneNumber, setValidPhoneNumber] = useState(false);
  const [newNumber, setNewNumber] = useState("");
  const [newNumbers, setNewNumbers] = useState<string[]>([]);
  const [volunteer, setVolunteer] = useState(null);

  useEffect(() => {
    fetchVolunteer();
  }, []);

  const fetchVolunteer = async () => {
    try {
      const response = await fetch(`/volunteers/:id`);
      console.log(response);
      if (response.ok) {
        const data = await response.json();
        console.log(data.volunteer);
        setVolunteer(data.volunteer);
      } else {
        console.log("Failed to fetch volunteer");
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };


  function validateEmail(email: string): boolean {
    // regular expression for email validation
    const emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // check if email matches the regex
    if (email.match(emailRegex)) {
      return true;
    } else {
      return false;
    }
  }

  function validatePhoneNumber(phoneNumber: string): boolean {
    // regular expression for email validation
    const phoneNumberRegex: RegExp =
      /^(1\s|1|)?((\(\d{3}\))|\d{3})(\-|\s)?(\d{3})(\-|\s)?(\d{4})$/;

    // check if email matches the regex
    if (phoneNumber.match(phoneNumberRegex)) {
      return true;
    } else {
      return false;
    }
  }

  useEffect(() => {
    setValidEmail(validateEmail(email));
  }, [email]);

  useEffect(() => {
    setValidPhoneNumber(validatePhoneNumber(phoneNumber));
  }, [phoneNumber]);

  const handleUpdateAvailability = () => {
    navigate("/availabilities");
  };

  console.log("Username:", username);
  console.log("Email:", email);
  console.log("Phone number:", phoneNumber);
  console.log("New numbers:", newNumbers);

  const handleSubmit = () => {
    // retrieve form data
    console.log("Username:", username);
    console.log("Email:", email);
    console.log("Phone number:", phoneNumber);
    console.log("New numbers:", newNumbers);

    // do something with the form data, e.g. send it to the server
    // ...
    navigate("/profile");
  };

  const handleAddNewNumber = () => {
    setNewNumbers([...newNumbers, newNumber]);
    setNewNumber("");
  };

  const handleDeleteNumber = (index: number) => {
    const updatedNumbers = [...newNumbers];
    updatedNumbers.splice(index, 1);
    setNewNumbers(updatedNumbers);
  };

  const handleCancel = () => {
    navigate("/profile");
  };

  return (
    <Box className="userprofile">
      {/* update user to have picture or intitals based on name in database */}
      <Box className="User">
        <h2 className="VolunteerName">John Doe</h2>
        <h3 className="Volunteer">Volunteer</h3>
        <Box className="initials"></Box>
      </Box>
      <form className="form" onSubmit={handleSubmit}>
        <Box className="details">
          <Box className="availabilities">
            <Box className="availabilities-left">
              <h3 className="checkin">Availability Check-in</h3>
              <h5 className="markAvailabilities">
                Mark your weekly Availabilities
              </h5>
            </Box>
            <CheckCircleOutlineIcon className="checkcircleAvailability" />
            <button
              className="updateAvailability"
              onClick={handleUpdateAvailability}
            >
              Update Availability
            </button>
          </Box>
          <h4 className="account">Account</h4>
          <hr className="divider"></hr>
          <Box className="Username"></Box>
          <label className="username">Username</label>
          <input
            className="usernameInput"
            type="text"
            placeholder="Username"
            value={username}
            onChange={(ev) => setUsername(ev.target.value)}
          />
          <Box className="Email"></Box>
          <label className="email">Email</label>
          <Box className="emailCheck">
            <input
              className="emailInput"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(ev) => setEmail(ev.target.value)}
            />
            {validEmail ? (
              <CheckCircleIcon className="checkcircleUsername" />
            ) : null}
          </Box>

          <h4 className="Contact">Contact</h4>
          <hr className="divider"></hr>
          <label className="phoneNumber">Phone Number</label>
          <Box className="checkPhoneNumber">
            <input
              className="number"
              type="text"
              placeholder="Phone Number"
              value={phoneNumber}
              onChange={(ev) => setPhoneNumber(ev.target.value)}
            />
            {validPhoneNumber ? (
              <CheckCircleIcon className="checkcircleUsername" />
            ) : null}
          </Box>

          {newNumbers.map((number, index) => {
            return (
              <div key={index} className="newNumberContainer">
                <input
                  type="text"
                  className="newNumber"
                  placeholder="Add a new Phone Number"
                  value={number}
                  onChange={(ev) => {
                    const updatedNumbers = [...newNumbers];
                    updatedNumbers[index] = ev.target.value;
                    setNewNumbers(updatedNumbers);
                  }}
                />
                <button
                  className="deleteButton"
                  onClick={() => handleDeleteNumber(index)}
                  type="button"
                >
                  <DeleteIcon />
                </button>
              </div>
            );
          })}

          <input
            type="text"
            className="newNumber"
            placeholder="Add a new Phone Number"
            value={newNumber}
            onChange={(ev) => setNewNumber(ev.target.value)}
          />

          <button
            className="addbutton"
            type="button"
            onClick={handleAddNewNumber}
          >
            +
          </button>
          <Box className="endbuttons">
            <button
              className="cancelbutton"
              type="button"
              onClick={handleCancel}
            >
              Cancel
            </button>
            <button className="savechanges" type="submit">
              Save Changes
            </button>
          </Box>
        </Box>
      </form>
    </Box>
  );
};

export default UserProfileContainer;
