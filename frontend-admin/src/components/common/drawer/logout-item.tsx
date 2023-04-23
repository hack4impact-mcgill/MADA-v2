import * as React from 'react';
import {DrawerItem} from "./drawer-item";
import { useNavigate } from "react-router-dom";

import Cookies from "universal-cookie";
const cookies = new Cookies();

export const LogoutItem = () => {
    const navigate = useNavigate();

    const onClickHandler = () => {
        cookies.remove("TOKEN");
        navigate("/login")
    }
    
    return (
        <DrawerItem label={"Logout"} onClickHandler={onClickHandler}/>
    )
}