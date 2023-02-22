import React from 'react';
import './NavBar.css'; 
import { BsCalendarCheck, BsCardList, BsFillPersonFill } from "react-icons/bs";


const NavBar = ()=> {
    return(
        <div className='navBar'>
            <button className='today'> <BsCalendarCheck className='icon'/> <br/> Today</button>
            <button className='MyTasks'> <BsCardList className='icon'/> <br/> My Tasks</button>
            <button className='Me'> <BsFillPersonFill className='icon'/> <br/> Me</button>
        </div>
    )
}

export default NavBar; 