import * as React from 'react';
import {DrawerItem} from "./drawer-item";
import { useNavigate } from "react-router-dom";

export const NavigateItem = (props: {label: string, path: string}) => {
    const navigate = useNavigate();
    const {label, path} = props;

    const onClickHandler = () => {
        navigate(path)
    }
    
    return (
        <DrawerItem label={label} onClickHandler={onClickHandler}/>
    )
}