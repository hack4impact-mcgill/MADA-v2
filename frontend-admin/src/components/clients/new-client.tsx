import React from 'react'
import {Box} from '@mui/material';
import { FormControl, FormLabel, TextField, Button, Typography } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};

const NewClientModalContents = () => {
    return (
        <Box sx={style}>
            <Typography variant="h5">Create new client</Typography>
            <br/>
            <FormControl sx={{width: '100%', height: '100%', display: 'flex', direction: 'column', justifyContent: 'space-beteen'}}>
                <FormLabel>Name</FormLabel>
                <TextField margin="dense" size="small" type="text" placeholder="name" sx={{marginBottom: 2}}></TextField>
                <FormLabel>Email</FormLabel>
                <TextField margin="dense" size="small" type="text" placeholder="email" sx={{marginBottom: 2}}></TextField>
                <FormLabel>Address</FormLabel>
                <TextField margin="dense" size="small" type="text" placeholder="address" sx={{marginBottom: 2}}></TextField>
                <Button sx={{marginTop: 2}}>Submit</Button>
            </FormControl>
        </Box>
    )
}

export default NewClientModalContents;