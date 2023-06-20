import React, { useEffect, useState } from "react";
import "../Styles/User.css";
import { Box } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { getVolunteer } from "../services";

export interface VolunteerType {
  availabilities: any[]; // Update the type of availabilities as needed
  email: string;
  id: number;
  name: string;
  password: string;
  phoneNumber: string;
  profilePicture: string;
  startDate: string;
  tasks: any[]; // Update the type of tasks as needed
  token: string;
}


const User = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [volunteer, setVolunteer] = useState<VolunteerType>();
 

  useEffect(() => {
    fetchVolunteer();
  }, []);

  const fetchVolunteer = async () => {
    try {
      const volunteerData = await getVolunteer(Number(id));
      setVolunteer(volunteerData.volunteer);
      console.log(volunteerData);
      console.log(volunteer);
    } catch (error) {
      console.error("Error fetching volunteer:", error);
    }
  };

  const handleEdit: React.MouseEventHandler<HTMLButtonElement> = () => {
    navigate(`/volunteers/${id}/edit`);
  };

  function formatCustomDate(dateString: string): string {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString('en-US', { month: 'long' });
    const year = date.getFullYear();
    const formattedDate = `${day}${getOrdinalSuffix(day)} ${month} ${year}`;
  
    return formattedDate;
  }
  
  // Helper function to get the ordinal suffix for the day (e.g., 1st, 2nd, 3rd, etc.)
  function getOrdinalSuffix(day: number): string {
    if (day >= 11 && day <= 13) {
      return 'th';
    }
    switch (day % 10) {
      case 1:
        return 'st';
      case 2:
        return 'nd';
      case 3:
        return 'rd';
      default:
        return 'th';
    }
  }
  

  

  if (!volunteer) {
    return <p>Loading volunteer...</p>;
  }

  return (
    <Box className="user-container">
      <Box className="User">
        <h2 className="VolunteerName">{volunteer.name}</h2>
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
        <Box className="Email">
          <label className="email">Email: </label>
          <span className="emailValue">{volunteer.email}</span>
        </Box>
        <Box className="Username">
          <label className="username">Start Date: </label>
          <span className="usernameValue">{formatCustomDate(volunteer.startDate)}</span>
        </Box>
        <h4 className="Contact">Contact</h4>
        <hr className="divider"></hr>
        <Box className="PhoneNumber">
          <label className="phoneNumber">Primary Phone Number: </label>
          <span className="phoneNumberValue">{volunteer.phoneNumber}</span>
        </Box>
      </Box>
    </Box>
  );
};

export default User;
