import * as React from 'react';
import {Container, Box} from '@mui/material';
import NavigationDrawer from './drawer/drawer';
import {PageHeader} from './page-actionbar';

export const BasePage = (props: {header: any, children: any}) => {
    return (
        <Box sx={{ display:'flex' , width: '100vw', height: '100vh'}}>
            <NavigationDrawer />
            <Box sx={{ display:'flex', flexDirection: 'column', overflowX: 'hidden', width: '100%'}}>
                <Container sx={{width: '100%', height: '100vh'}} maxWidth={false}>
                    <PageHeader>{props.header}</PageHeader>
                    <>
                        {props.children}
                    </>
                </Container>
            </Box>
        </Box>
    )
}

export default BasePage;