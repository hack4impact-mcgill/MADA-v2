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
import {textFieldStyles, ModalTextInput} from 'src/components/common/modal/textinput'
import {style} from 'src/components/common/modal/style'

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

    const handleCreate = () => {
        mutation.mutate({
            name: name,
            username: username,
            password: 'test',
            email: email,
            phoneNumber: 21334
        })
        props.handleClose()
    }
    
    const handleCancel = () => {
        console.log("cancel")
    }

    return (
        <Box sx={style}>
            <Typography variant="h5">Create new volunteer</Typography>
            <br/>
            <FormControl sx={{width: '100%', height: '100%', display: 'flex', direction: 'column', justifyContent: 'space-beteen'}}>
                <ModalTextInput label={"Name"} stateValue={name} stateSetter={handleNameChange}/>
                <ModalTextInput label={"Username"} stateValue={username} stateSetter={handleUsernameChange}/>
                <ModalTextInput label={"Email"} stateValue={email} stateSetter={handleEmailChange}/>
                <FormLabel>Start Date</FormLabel>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker slotProps={{ textField: textFieldStyles }} value={date} onChange={(d) => setDate(d)}/>
                </LocalizationProvider>
                <Box sx={{display: 'flex', width: '100%', height: '100%', flexDirection: 'row-reverse'}}>
                    <Button variant="contained" onClick={handleCreate}>Create</Button>
                    <Button sx={{marginRight: 2}} onClick={handleCancel}>Cancel</Button>
                </Box>
            </FormControl>
        </Box>
    )
}

export default NewVolunteerModalContents;