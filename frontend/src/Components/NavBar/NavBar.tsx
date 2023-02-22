import React from 'react';
import './NavBar.css'; 
import { BsCalendarCheck, BsCardList, BsFillPersonFill } from "react-icons/bs";


const NavBar = ()=> {

    return(
        <div className='navBar'>
            <hr ></hr>
            <div className='horizontalBar'>
                <button> <BsCalendarCheck className='icon'/> <br/> Today</button>
                <button> <BsCardList className='icon'/> <br/> My Tasks</button>
                <button> <BsFillPersonFill className='icon'/> <br/> Me</button>
            </div>
        </div>
    )
}

export default NavBar; 