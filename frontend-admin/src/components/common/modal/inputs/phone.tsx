import React from 'react'
import { FormLabel } from '@mui/material';
import MuiPhoneNumber from 'material-ui-phone-number-2'
import {inputStyle} from './style'

export const ModalPhoneInput = (props: {type?: string, label: string, stateValue: string, stateSetter: any}) => {
    return (
        <>
            <FormLabel>{props.label}</FormLabel>
            <MuiPhoneNumber {...inputStyle} defaultCountry={'us'} value={props.stateValue} onChange={props.stateSetter} />
        </>
    )
}