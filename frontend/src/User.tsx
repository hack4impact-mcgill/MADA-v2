import React from 'react'
import "./User.css"
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';

const User = () => {
  return (
    <div>
      <div className='userprofile'>
        <div className='User'></div>
        <img src="image.jpg" alt=''/>
        <h2 className='VolunteerName'>John Doe</h2>
        <h3 className='Volunteer'>Volunteer</h3>
        <button className='help-button'>Help</button>
        
        <div className='Availabilities'></div>
        <h3 className='checkin'>Availability Check-in</h3>
        <h5 className='markAvailabilities'>Mark your weekly Availabilities</h5>
        <button className='updateAvailability'>Update Availability</button>
        <CheckCircleOutlineIcon className='checkcircleAvailability'/>
        <h4 className="account">Account</h4>
        <hr className='accountline'></hr>
          <div className='Email'></div>
          <h4 className='email'>Email</h4>
          <input className="emailInput" type="text" placeholder="Email" />
          <CheckCircleIcon className='checkcircleUsername'/>
          <div className='Username'></div>
          <h4 className='username'>Username</h4>
          <input className='usernameInput' type="text" placeholder='Username'/>
          <h4 className='Contact'>Contact</h4>
          <hr className='contactline'></hr>
          <h4 className="phoneNumber">Phone Number</h4>
              <input className='number' type="text" placeholder='Number'/>
              <input className='newNumber' type="text" placeholder='Add a new Number'/>
              <button className='addbutton'>+</button>
              <button className='cancelbutton'>Cancel</button>
              <button className='savechanges'>Save Changes</button>
              <div className='footer'></div>
        
              <button className='today'><EventAvailableIcon/></button>
              <button className='mytasks'>My Tasks</button>
              <button className='meButton'>Me</button>
      </div>
    </div>
  )
}

export default User