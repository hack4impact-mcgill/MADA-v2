import React from 'react'
import {Box} from '@mui/material';
import { FormControl, FormLabel, TextField, Button, Typography } from '@mui/material';
import {style} from 'src/components/common/modal/style'
import {ModalTextInput} from 'src/components/common/modal/textinput'
import BaseModal from 'src/components/common/modal/modal'

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
        <BaseModal
            title={"Create new client"}
            modalActionBarProps={{
                primaryActionProps: {
                    handlePrimary: handleCreate,
                    labelPrimary: "Create"
                },
                secondaryActionProps: [
                    {
                        handle: handleCancel,
                        label: "Cancel"
                    }
                ]
            }}
            modalInputProps={[
                {
                    label: "Name",
                    stateValue: name,
                    stateSetter: handleNameChange
                },
                {
                    label: "Email",
                    stateValue: email,
                    stateSetter: handleEmailChange
                },
                {
                    label: "Address",
                    stateValue: address,
                    stateSetter: handleAddressChange
                },
            ]}
        />
    )
}

export default NewClientModalContents;