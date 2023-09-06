import React, {useState} from 'react'
import {Box, Button} from '@mui/material';
 
const ActionButton = (props: {handler: any, label: any}) => {
    return (
        <Button variant="outlined" onClick={props.handler}>{props.label}</Button>
    )
}

export type ActionProps = {
    handler: any,
    label: string
}

export const PageHeader = (props: {children: any}) => {
    return (<Box sx={{display: 'flex', my: 2}}>
        {props.children}
    </Box>)
}

export const ActionBar = (props: {actions: ActionProps[]}) => {
    return (
        <Box sx={{display: 'flex', width: '100%', justifyContent: 'flex-end'}}>
            {props.actions.map((action, index) => (
                <Box sx={{ml: 1}}>
                    <ActionButton handler={action.handler} label={action.label}/>
                </Box>
            ))}
        </Box>
    )
}