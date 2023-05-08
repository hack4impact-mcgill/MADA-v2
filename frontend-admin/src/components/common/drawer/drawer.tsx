import * as React from 'react';
import {Box, Drawer, List} from '@mui/material';
import {NavigateItem} from "./navigate-item";
import {LogoutItem} from "./logout-item";

import {style} from './style';

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
    },
    {
        label: 'Routes',
        path: '/routes'
    }
]

export const NavigationDrawer = () => {
    return (<>
        <Drawer
            sx={style}
            variant="persistent"
            anchor="left"
            open={true}
        >
            <List sx={{display: 'flex', height: '100%', flexDirection: 'column',justifyContent: 'space-between'}}>
                <Box>
                    {navList.map((navItem) => (
                        <NavigateItem {...navItem}/>
                    ))}
                </Box>

                <LogoutItem/>
            </List>
        </Drawer>
    </>)
}

export default NavigationDrawer;