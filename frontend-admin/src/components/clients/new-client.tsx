import React from 'react'
import {Box} from '@mui/material';
import { FormControl, FormLabel, TextField, Button, Typography } from '@mui/material';
import {style} from 'src/components/common/modal/style'
import {ModalTextInput} from 'src/components/common/modal/textinput'

const NewClientModalContents = () => {
    const [name, setName] = React.useState('');
    const [address, setAddress] = React.useState('');
    const [email, setEmail] = React.useState('');

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {setName(event.target.value)};
    const handleAddressChange = (event: React.ChangeEvent<HTMLInputElement>) => {setAddress(event.target.value)};
    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {setEmail(event.target.value)};
    
    const handleCreate = async () => {
        console.log("create")
    }
    
    const handleCancel = () => {
        console.log("cancel")
    }

    return (
        <Box sx={style}>
            <Typography variant="h5">Create new client</Typography>
            <br/>
            <FormControl sx={{width: '100%', height: '100%', display: 'flex', direction: 'column', justifyContent: 'space-beteen'}}>
                <ModalTextInput label={"Name"} stateValue={name} stateSetter={handleNameChange}/>
                <ModalTextInput label={"Email"} stateValue={email} stateSetter={handleEmailChange}/>
                <ModalTextInput label={"Address"} stateValue={address} stateSetter={handleAddressChange}/>
                <Box sx={{display: 'flex', width: '100%', height: '100%', flexDirection: 'row-reverse'}}>
                    <Button variant="contained" onClick={handleCreate}>Create</Button>
                    <Button sx={{marginRight: 2}} onClick={handleCancel}>Cancel</Button>
                </Box>
            </FormControl>
        </Box>
    )
}

export default NewClientModalContents;