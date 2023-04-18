import React from 'react'
import {Box} from '@mui/material';
import { FormControl, FormLabel, TextField, Button, Typography } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import {
    useQuery,
    useMutation,
    useQueryClient,
    QueryClient,
    QueryClientProvider,
} from '@tanstack/react-query'
import {createVolunteer} from 'src/api/volunteers'
import dayjs, { Dayjs } from 'dayjs';

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

const NewVolunteerModalContents = (props: {handleClose: any}) => {
    const queryClient = useQueryClient()

    const mutation = useMutation(createVolunteer, {
        onSuccess: () => {
            // Invalidate and refetch
            queryClient.invalidateQueries('volunteers')
        },
    })

    const [name, setName] = React.useState('');
    const [username, setUsername] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [date, setDate] = React.useState<Dayjs | null>(null);

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {setName(event.target.value)};
    const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {setUsername(event.target.value)};
    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {setEmail(event.target.value)};

    const handleSubmit = () => {
        mutation.mutate({
            name: name,
            username: username,
            password: 'test',
            email: email,
            phoneNumber: 21334
        })
        props.handleClose()
    }

    return (
        <Box sx={style}>
            <Typography variant="h5">Create new volunteer</Typography>
            <br/>
            <FormControl sx={{width: '100%', height: '100%', display: 'flex', direction: 'column', justifyContent: 'space-beteen'}}>
                <FormLabel>Name</FormLabel>
                <TextField {...textFieldStyles} value={name} onChange={handleNameChange}></TextField>
                <FormLabel>username</FormLabel>
                <TextField {...textFieldStyles} value={username} onChange={handleUsernameChange}></TextField>
                <FormLabel>Email</FormLabel>
                <TextField {...textFieldStyles} value={email} onChange={handleEmailChange}></TextField>
                <FormLabel>Start Date</FormLabel>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker slotProps={{ textField: { size: 'small', margin: 'dense' } }} value={date} onChange={(d) => setDate(d)}/>
                </LocalizationProvider>
                <Button sx={{marginTop: 2}} onClick={handleSubmit}>Submit</Button>
            </FormControl>
        </Box>
    )
}

export default NewVolunteerModalContents;