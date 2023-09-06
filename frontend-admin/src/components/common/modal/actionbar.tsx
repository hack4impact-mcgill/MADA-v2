import React from 'react'
import {Box} from '@mui/material';
import { FormControl, FormLabel, TextField, Button, Typography } from '@mui/material';

const PrimaryActionButton = (props: PrimaryActionProps) => {
    return (<>
        <Button disabled={props.disabled ? props.disabled : false} variant="contained" onClick={props.handlePrimary}>{props.labelPrimary}</Button>
    </>)
}

const SecondaryActionButton = (props: SecondaryActionProps) => {
    return (<>
        <Button sx={{marginRight: 2}} onClick={props.handle}>{props.label}</Button>
    </>)
}

type PrimaryActionProps = {
    handlePrimary: any,
    labelPrimary: string,
    disabled?: boolean
}

type SecondaryActionProps = {
    handle: any,
    label: string
}

export type ModalActionBarProps = {
    primaryActionProps: PrimaryActionProps,
    secondaryActionProps: SecondaryActionProps[]
}

export const ModalActionBar = (props: ModalActionBarProps) => {
    return (<>
        <Box sx={{display: 'flex', width: '100%', height: '100%', flexDirection: 'row-reverse'}}>
            <PrimaryActionButton {...props.primaryActionProps}/>
            {props.secondaryActionProps.map((actionProps, index) => {
                return <SecondaryActionButton key={actionProps.label} {...actionProps}/>
            })}
        </Box>
    </>)
}