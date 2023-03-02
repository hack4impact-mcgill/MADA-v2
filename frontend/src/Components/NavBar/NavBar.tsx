import React from 'react';
import './NavBar.css'; 
import { BsCalendarCheck, BsCardList, BsFillPersonFill } from "react-icons/bs";


const NavBar = ()=> {

    const onClickToday = async () => {
        window.location.href = '/today';
    };

    const onClickTasks = async () => {
        window.location.href = '/tasks';
    };

    const onClickMe = async () => {
        window.location.href = '/profile';
    };

    return(
        <div className='navBar'>
            <hr ></hr>
            <div className='horizontalBar'>
                <button onClick={onClickToday}> <BsCalendarCheck className='icon'/> <br/> Today</button>
                <button onClick={onClickTasks}> <BsCardList className='icon'/> <br/> My Tasks</button>
                <button onClick={onClickMe}> <BsFillPersonFill className='icon'/> <br/> Me</button>
            </div>
        </div>
    )
}

export default NavBar; 