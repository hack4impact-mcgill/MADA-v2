import React, {useEffect} from 'react'
import {Box} from '@mui/material';
import { FormControl, FormLabel, TextField, Button, Typography } from '@mui/material';
import {EditVolunteerState, useEditVolunteerStore} from 'src/components/volunteers/volunteer.store';
import {getVolunteer, editVolunteer, getVolunteers} from 'src/api/volunteers'

import {
    useQuery,
    useMutation,
    QueryClient
} from '@tanstack/react-query'

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

const textFieldStyles = {
    margin: 'dense' as 'dense',
    size: 'small' as 'small',
    type: 'text',
    variant: 'outlined' as 'outlined',
    sx: {
        marginBottom: 2,
    }
}

const EditVolunteerModalContents = () => {
    const id = useEditVolunteerStore((state: EditVolunteerState) => state.id)
    const setId = useEditVolunteerStore((state: EditVolunteerState) => state.setId)

    const { isLoading, isError, data, error } = useQuery({
        queryKey: ['volunteers', id],
        queryFn: () => getVolunteer(id)
    })

    const [name, setName] = React.useState('');
    const [username, setUsername] = React.useState('');
    const [email, setEmail] = React.useState('');

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {setName(event.target.value)};
    const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {setUsername(event.target.value)};
    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {setEmail(event.target.value)};

    useEffect(() => {
        if (data) {
            setName(data!.data.volunteer.name);
            setUsername(data!.data.volunteer.username);
            setEmail(data!.data.volunteer.email);
        }
    }, [data]);
    
    const queryClient = new QueryClient()

    const mutation = useMutation(editVolunteer, {
        onSuccess: () => {
            // Invalidate and refetch
            queryClient.invalidateQueries('volunteers')
        },
    })
    
    const handleSave = async () => {
        await mutation.mutate({
            id: id,
            data: {
                name: name,
                username: username,
                email: email,
            }
        })
        setId(-1)
    }
    
    const handleCancel = () => {
        setId(-1)
    }

    return (
        <Box sx={style}>
            {
                isLoading ? null :
                <>
                    <Typography variant="h5">Edit {name}</Typography>
                    <br/>
                    <FormControl sx={{width: '100%', height: '100%', display: 'flex', direction: 'column', justifyContent: 'space-beteen'}}>
                        <FormLabel>Name</FormLabel>
                        <TextField {...textFieldStyles} value={name} onChange={handleNameChange}></TextField>
                        <FormLabel>username</FormLabel>
                        <TextField {...textFieldStyles} value={username} onChange={handleUsernameChange}></TextField>
                        <FormLabel>Email</FormLabel>
                        <TextField {...textFieldStyles} value={email} onChange={handleEmailChange}></TextField>
                        
                        <Box sx={{display: 'flex', width: '100%', height: '100%', flexDirection: 'row-reverse'}}>
                            <Button variant="contained" onClick={handleSave}>Save</Button>
                            <Button sx={{marginRight: 2}} onClick={handleCancel}>Cancel</Button>
                        </Box>
                    </FormControl>
                </>
            }
        </Box>
    )
}

export default EditVolunteerModalContents;