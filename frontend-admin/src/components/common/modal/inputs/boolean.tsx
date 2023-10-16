import React from 'react'
import {ModalInputProps} from './type';

import {inputStyle} from './style'
import { Switch, FormLabel, FormControlLabel } from '@mui/material';
import { Box } from '@mui/system';

export const ModalBooleanInput = (props: ModalInputProps) => {
    return (
        <>
            <Box>
                <FormLabel>{props.label}</FormLabel>
                <Switch checked={props.stateValue} onChange={props.stateSetter} />
            </Box>
        </>
    )
}