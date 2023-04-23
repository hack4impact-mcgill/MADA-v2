import * as React from 'react';
import {Box} from '@mui/material';
import NavigationDrawer from './drawer/drawer';

export const BasePage = (props: {children: any}) => {
    return (
        <Box sx={{ display:'flex' , width: '100vw', height: '100vh'}}>
            <NavigationDrawer />
            <Box sx={{ display:'flex', flexDirection: 'column', overflowX: 'hidden', width: '100%'}}>
                <Box sx={{ display:'flex', flexDirection: 'column', overflowX: 'auto'}}>
                    {props.children}
                </Box>
            </Box>
        </Box>
    )
}

export default BasePage;