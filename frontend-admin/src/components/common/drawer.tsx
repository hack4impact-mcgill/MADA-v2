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

export const NavigationDrawer = () => {
    const navigate = useNavigate();
    return (<>
        <Drawer
            sx={drawerStyles}
            variant="persistent"
            anchor="left"
            open={true}
        >
            <List>
                {navList.map((navItem) => (
                    <ListItem key={navItem.label} disablePadding>
                        <ListItemButton onClick={() => navigate(navItem.path)}>
                            <ListItemText primary={navItem.label} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Drawer>
    </>)
}

export const Page = (props: {children: any}) => {
    return (
        <Box sx={{ display:'flex' , width: '100vw', height: '100vh'}}>
            <NavigationDrawer />
            <Box sx={{ display:'flex', flexDirection: 'column', overflowX: 'hidden'}}>
                <Box sx={{ display:'flex', flexDirection: 'column', overflowX: 'auto'}}>
                    {props.children}
                </Box>
            </Box>
        </Box>
    )
}