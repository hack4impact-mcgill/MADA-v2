import React from 'react'
import {Box} from '@mui/material';
import { FormControl, FormLabel, TextField, Button, Typography, MenuItem } from '@mui/material';
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
import dayjs, { Dayjs } from 'dayjs';
import {textFieldStyles, ModalTextInput} from 'src/components/common/modal/textinput'
import {style} from 'src/components/common/modal/style'
import {getVolunteers} from 'src/api/volunteers'
import {getClients} from 'src/api/clients'

const NewTaskModalContents = (props: {handleClose: any}) => {
    const queryClient = useQueryClient()

    // const mutation = useMutation(createVolunteer, {
    //     onSuccess: () => {
    //         // Invalidate and refetch
    //         queryClient.invalidateQueries('volunteers')
    //     },
    // })
    const { isLoading: isLoadingVolunteer, data: volunteerData } = useQuery(['volunteers'], () => getVolunteers())
    const { isLoading: isLoadingClient, data: clientData } = useQuery(['clients'], () => getClients())

    const [date, setDate] = React.useState<Dayjs | null>(null);

    const handleCreate = () => {
        // mutation.mutate({
        //     name: name,
        //     username: username,
        //     password: 'test',
        //     email: email,
        //     phoneNumber: 21334
        // })
        props.handleClose()
    }
    
    const handleCancel = () => {
        console.log("cancel")
    }

    return (
        <Box sx={style}>
            <Typography variant="h5">Create new task</Typography>
            <br/>
            <FormControl sx={{width: '100%', height: '100%', display: 'flex', direction: 'column', justifyContent: 'space-beteen'}}>
                <FormLabel>Delivery Date</FormLabel>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker slotProps={{ textField: textFieldStyles }} value={date} onChange={(d) => setDate(d)}/>
                </LocalizationProvider>
                <FormLabel>Volunteer</FormLabel>
                <TextField select size={"small"} sx={{marginBottom: 2}}>
                    {!isLoadingVolunteer && volunteerData!.data.volunteers.map((volunteer: any) => 
                        <MenuItem key={volunteer.id} value={volunteer.name}>
                            {volunteer.name}
                        </MenuItem>
                    )}
                </TextField>
                <FormLabel>Clients</FormLabel>
                <TextField select size={"small"} sx={{marginBottom: 2}} SelectProps={{
                    multiple: true,
                    value: ["test", "test2"],
                    onChange: (event) => {
                        console.log(event.target.value)
                    }
                }}>
                    {!isLoadingClient && clientData!.data.clients.map((volunteer: any) => 
                        <MenuItem key={volunteer.id} value={volunteer.name}>
                            {volunteer.name}
                        </MenuItem>
                    )}
                </TextField>
                <Box sx={{display: 'flex', width: '100%', height: '100%', flexDirection: 'row-reverse'}}>
                    <Button variant="contained" onClick={handleCreate}>Create</Button>
                    <Button sx={{marginRight: 2}} onClick={handleCancel}>Cancel</Button>
                </Box>
            </FormControl>
        </Box>
    )
}

export default NewTaskModalContents;