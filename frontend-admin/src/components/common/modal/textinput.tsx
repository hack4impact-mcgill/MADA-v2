import React from 'react'
import { FormLabel, TextField } from '@mui/material';

export const textFieldStyles = {
    margin: 'dense' as 'dense',
    size: 'small' as 'small',
    type: 'text',
    variant: 'outlined' as 'outlined',
    sx: {
        marginBottom: 2,
    }
}

export const ModalTextInput = (props: {label: string, stateValue: string, stateSetter: any}) => {
    return (
        <>
            <FormLabel>{props.label}</FormLabel>
            <TextField {...textFieldStyles} value={props.stateValue} onChange={props.stateSetter}></TextField>
        </>
    )
}