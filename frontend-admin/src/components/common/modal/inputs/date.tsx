import React from 'react'
import {ModalInputProps} from './type';
import {inputStyle} from './style'
import { FormLabel } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

export const ModalDateInput = (props: ModalInputProps) => {
    return (
        <>
            <FormLabel>{props.label}</FormLabel>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker slotProps={{ textField: inputStyle }} value={props.stateValue} onChange={props.stateSetter}/>
            </LocalizationProvider>
        </>
    )
}