import React from 'react'
import { MenuItem, FormLabel, TextField } from '@mui/material';
import {SelectOptionProps, ModalInputProps} from './type';

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
            {props.options!.map((option: SelectOptionProps) =>
                <MenuItem key={option.value} value={option.value}>
                    {option.label}
                </MenuItem>
            )}
        </TextField>
    </>)
} 