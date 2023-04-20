import React, {useState} from 'react'
import {Box, Button} from '@mui/material';

const PageActionButton = (props: {handler: any, label: any}) => {
    return (
        <Button variant="outlined" onClick={props.handler} sx={{ml: 1}}>{props.label}</Button>
    )
}

export type ActionProps = {
    handler: any,
    label: string
}

export const PageActionBar = (props: {actions: ActionProps[]}) => {
    return (
        <>
            <Box sx={{display: 'flex', my: 2, justifyContent: 'flex-end'}}>
                {props.actions.map((action, index) => (
                    <PageActionButton handler={action.handler} label={action.label}/>
                ))}
            </Box>
        </>
    )
}