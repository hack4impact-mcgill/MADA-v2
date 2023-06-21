import React, { useEffect, useState } from "react";
import "../Styles/UserProfile.css";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import Box from "@mui/material/Box";
import { useNavigate, useParams } from "react-router-dom";
import { VolunteerType } from "./UserContainer";
import { editVolunteer, getVolunteer } from "../services";
import { setDefaultResultOrder } from "dns";
import { getCurrentUserId } from "../helper";

const UserProfileContainer = () => {
  const navigate = useNavigate();
  const id = Number(getCurrentUserId());
  const [volunteer, setVolunteer] = useState<VolunteerType | undefined>();
  const [email, setEmail] = useState<string>("");
  const [validEmail, setValidEmail] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [validPhoneNumber, setValidPhoneNumber] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetchVolunteer();
  }, []);

  const fetchVolunteer = async () => {
    try {
      const volunteerData = await getVolunteer(id);
      setVolunteer(volunteerData.volunteer);
      console.log(volunteerData);
      console.log(volunteer);
      if (volunteerData.volunteer) {
        setEmail(volunteerData.volunteer.email || "");
        setPhoneNumber(volunteerData.volunteer.phoneNumber || "");
      }
    } catch (error) {
      console.error("Error fetching volunteer:", error);
    }
  };

  function validateEmail(email: string): boolean {
    const emailRegex: RegExp =
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const endsWithDotCom: boolean = email.toLowerCase().endsWith(".com");
    return emailRegex.test(email) && endsWithDotCom;
  }

  function validatePhoneNumber(phoneNumber: string): boolean {
    const phoneNumberRegex: RegExp =
      /^(1\s|1|)?((\(\d{3}\))|\d{3})(\-|\s)?(\d{3})(\-|\s)?(\d{4})$/;
    return phoneNumber.match(phoneNumberRegex) !== null;
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

  const handleSubmit = async () => {
    if (!validatePhoneNumber(phoneNumber) || !validateEmail(email)) {
      setError(true);
      setTimeout(() => setError(false), 3000); // Clear error message after 3 seconds
    } else {
      try {
        const updatedVolunteer = {
          id: id,
          email,
          phoneNumber,
        };

        await editVolunteer(id, updatedVolunteer);
        navigate(`/profile`);
      } catch (error) {
        console.error("Error updating volunteer:", error);
      }
    }
  };

  const handleCancel = () => {
    navigate(`/profile`);
  };

  return (
    <Box className="userprofile">
      {/* update user to have picture or intitals based on name in database */}
      <Box className="User">
        <h2 className="VolunteerName">{volunteer?.name}</h2>
        <h3 className="Volunteer">Volunteer</h3>
        <Box className="initials"></Box>
      </Box>
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
        <Box className="Email"></Box>
        <label className="email">Email</label>
        <Box className="emailCheck">
          <input
            className="emailInput"
            type="email"
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
            value={phoneNumber}
            onChange={(ev) => setPhoneNumber(ev.target.value)}
          />
          {validPhoneNumber ? (
            <CheckCircleIcon className="checkcircleUsername" />
          ) : null}
        </Box>
        {error ? (
          <Box className="error">Please Enter Valid Email or Phone Number</Box>
        ) : null}
        <Box className="endbuttons">
          <button className="cancelbutton" type="button" onClick={handleCancel}>
            Cancel
          </button>
          <button className="savechanges" type="submit" onClick={handleSubmit}>
            Save Changes
          </button>
        </Box>
      </Box>
    </Box>
  );
};

export default UserProfileContainer;
