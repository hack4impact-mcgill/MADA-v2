import React from 'react'
import { MenuItem, FormLabel, TextField } from '@mui/material';
import {ModalInputProps} from './type';

export const ModalSelectInput = (props: ModalInputProps) => {
    return (<>
            <FormLabel>{props.label}</FormLabel>
            <TextField select size={"small"} sx={{marginBottom: 2}}>
                {props.options!.map((option: string) =>
                    <MenuItem key={option} value={option}>
                        {option}
                    </MenuItem>
                )}
            </TextField>
        </>
    )
}
