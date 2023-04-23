import React from 'react'
import { TextField } from '@mui/material';
import {inputStyle} from './style'

export const NumberInput = (props: {stateValue: number, stateSetter: any}) => {
    const onChange = (event: any) => {
        const value = event.target.value;
        if (value.match((/^[0-9]+$/)) && parseInt(value) > 0) {
            props.stateSetter(event)
        }
    }

    return (
        <TextField {...inputStyle} type="number" value={props.stateValue} onChange={onChange}></TextField>   
    )
}