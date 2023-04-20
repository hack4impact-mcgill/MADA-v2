import * as React from 'react';
import {Box, Drawer, List, ListItem, ListItemButton, ListItemText} from '@mui/material';
import { useNavigate } from "react-router-dom";

const drawerWidth = 200;

const navList = [
    {
        label: 'Volunteers',
        path: '/volunteers'
    },
    {
        label: 'Clients',
        path: '/clients'
    },
    {
        label: 'Tasks',
        path: '/tasks'
    }
]

const drawerStyles = {
    width: drawerWidth,
    flexShrink: 0,
    '& .MuiDrawer-paper': {
        width: drawerWidth,
        boxSizing: 'border-box',
    },
}

const DrawerListItem = (props: {label: string, path: string}) => {
    const navigate = useNavigate();
    const {label, path} = props;

    return (
        <ListItem disablePadding>
            <ListItemButton onClick={() => navigate(path)}>
                <ListItemText primary={label} />
            </ListItemButton>
        </ListItem>
    )
}

export const NavigationDrawer = () => {
    const navigate = useNavigate();
    return (<>
        <Drawer
            sx={drawerStyles}
            variant="persistent"
            anchor="left"
            open={true}
        >
            <List sx={{display: 'flex', height: '100%', flexDirection: 'column',justifyContent: 'space-between'}}>
                <Box>
                    {navList.map((navItem) => (
                        <DrawerListItem {...navItem}/>
                    ))}
                </Box>

                <DrawerListItem path={"/login"} label={"Logout"}/>
            </List>
        </Drawer>
    </>)
}

export default NavigationDrawer;