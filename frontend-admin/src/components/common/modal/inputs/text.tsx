import React from 'react'
import { FormLabel, TextField } from '@mui/material';
import {inputStyle} from './style'

export const ModalTextInput = (props: {type?: string, label: string, stateValue: string, stateSetter: any}) => {
    return (
        <>
            <FormLabel>{props.label}</FormLabel>
            <TextField {...inputStyle} type={props.type ? props.type : 'text'} value={props.stateValue} onChange={props.stateSetter}></TextField>
        </>
    )
}