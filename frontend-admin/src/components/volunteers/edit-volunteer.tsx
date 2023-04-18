import React from 'react'
import {Box} from '@mui/material';
import { FormControl, FormLabel, TextField, Button, Typography } from '@mui/material';
import {EditVolunteerState, useEditVolunteerStore} from 'src/components/volunteers/volunteer.store';

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

const EditVolunteerModalContents = () => {
    const id = useEditVolunteerStore((state: EditVolunteerState) => state.id)

    // Get volunteer
    //const { isLoading, isError, data, error } = useQuery(['volunteers'], () => getVolunteers())

    return (
        <Box sx={style}>
            <Typography variant="h5">Edit NAME</Typography>
            <br/>
            <FormControl sx={{width: '100%', height: '100%', display: 'flex', direction: 'column', justifyContent: 'space-beteen'}}>
                <FormLabel>Name</FormLabel>
                <TextField margin="dense" size="small" type="text" placeholder="name" sx={{marginBottom: 2}}></TextField>
                <FormLabel>username</FormLabel>
                <TextField margin="dense" size="small" type="text" placeholder="username" sx={{marginBottom: 2}}></TextField>
                <FormLabel>Email</FormLabel>
                <TextField margin="dense" size="small" type="text" placeholder="email" sx={{marginBottom: 2}}></TextField>
                <Box sx={{display: 'flex', width: '100%', height: '100%', flexDirection: 'row-reverse'}}>
                    <Button variant="contained">Save</Button>
                    <Button sx={{marginRight: 2}}>Cancel</Button>
                </Box>
            </FormControl>
        </Box>
    )
}

export default EditVolunteerModalContents;