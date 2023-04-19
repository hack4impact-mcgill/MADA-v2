import React from 'react'
import { MenuItem, FormLabel, TextField } from '@mui/material';
import {ModalInputProps} from './type';

export const ModalMultiselectInput = (props: ModalInputProps) => {
    return (<>
        <FormLabel>{props.label}</FormLabel>
        <TextField select size={"small"} sx={{marginBottom: 2}}
            SelectProps={{
                multiple: true,
                value: props.stateValue,
                onChange: props.stateSetter
            }}
        >
            {props.options!.map((option: string) =>
                <MenuItem key={option} value={option}>
                    {option}
                </MenuItem>
            )}
        </TextField>
    </>)
} 