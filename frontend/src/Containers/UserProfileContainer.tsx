import React, { useEffect, useState } from "react";
import "./UserProfile.css";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";

const UserProfileContainer = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>('');
  const [validEmail, setValidEmail] = useState(false);

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
  
  useEffect(()=>{

  },[])


  useEffect(()=>{

    setValidEmail(validateEmail(email));

  },[email])

console.log('email', email);
  const handleUpdateAvailability = ()=>{
navigate('/availabilities')
    
  }

  return (
        <Box className="userprofile">
          <Box className="User">
            <h2 className="VolunteerName">John Doe</h2>
            <h3 className="Volunteer">Volunteer</h3>
            <Box className="initials"></Box>
          </Box>
          <Box className="details">
            <Box className="availabilities">
              <Box className='availabilities-left'>
              <h3 className="checkin">Availability Check-in</h3>
              <h5 className="markAvailabilities">
              Mark your weekly Availabilities
            </h5>
              </Box>
              <CheckCircleOutlineIcon className="checkcircleAvailability"/>
            <button className="updateAvailability" onClick={handleUpdateAvailability}>Update Availability</button>
            </Box>
            
            <h4 className="account">Account</h4>
            <hr className="divider"></hr>
            <Box className="Email"></Box>
            <label className="email">Email</label>
            <input className="emailInput" type="email" placeholder="Email" value = {email} onChange={(ev)=>setEmail(ev.target.value)}/>
            {validEmail? <CheckCircleIcon className="checkcircleUsername" /> : null}
            <Box className="Username"></Box>
            <label className="username">Username</label>
            <input
              className="usernameInput"
              type="text"
              placeholder="Username"
            />
            <h4 className="Contact">Contact</h4>
            <hr className="divider"></hr>
            <label className="phoneNumber">Phone Number</label>
            <input className="number" type="text" placeholder="Number" />
            <input
              className="newNumber"
              type="text"
              placeholder="Add a new Number"
            />
            <button className="addbutton">+</button>
          </Box>
          <Box className="endbuttons">
            <button className="cancelbutton">Cancel</button>
            <button className="savechanges" >Save Changes</button>
          </Box>
        </Box>
  );
};

export default UserProfileContainer;
