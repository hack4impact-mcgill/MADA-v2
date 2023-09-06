import React from 'react'
import {Box} from '@mui/material';
import {FormControl, Typography} from '@mui/material';
import {style} from 'src/components/common/modal/style'

export const BaseModal = (props: {title: string, children: any}) => {
    return (
        <Box sx={style}>
            <Typography variant="h5">{props.title}</Typography>
            <br/>
            <FormControl sx={{width: '100%', height: '100%', display: 'flex', direction: 'column', justifyContent: 'space-beteen'}}>
                {props.children}
            </FormControl>
        </Box>
    )
}

export const isAllValid = (list: any[]) => {
    const validList = list.map((value) => {
        if (value == true) return true;
        if (value == undefined) return false;
        if (value == "") return false;
        if (value == false) return false;
        return true
    })

    return validList.every(Boolean)
}
