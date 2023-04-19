import React from 'react'
import {Box} from '@mui/material';
import {FormControl, Typography} from '@mui/material';
import {getInputByType, ModalInputProps} from './inputs/type';
import {style} from 'src/components/common/modal/style'
import {ModalActionBar, ModalActionBarProps} from './actionbar';

type ModalProps = {
    title: string,
    modalActionBarProps: ModalActionBarProps,
    modalInputProps: ModalInputProps[]
}

// Check if all inputs are valid
// const isValid = (list: any[]) => {
//     const validList = list.map((inputProps) => {
//         if (inputProps.stateValue == undefined) return false;
//         if (inputProps.stateValue == "") return false;
//         if (inputProps.valid == false) return false;
//         return true
//     })

//     return validList.every(Boolean)
// }

const BaseModal = (props: ModalProps) => {
    return (
        <Box sx={style}>
            <Typography variant="h5">{props.title}</Typography>
            <br/>
            <FormControl sx={{width: '100%', height: '100%', display: 'flex', direction: 'column', justifyContent: 'space-beteen'}}>
                {props.modalInputProps.map((inputProps) => {
                    return <>{getInputByType(inputProps)}</>
                })}
                <ModalActionBar {...props.modalActionBarProps}/>
            </FormControl>
        </Box>
    )
}

export default BaseModal;