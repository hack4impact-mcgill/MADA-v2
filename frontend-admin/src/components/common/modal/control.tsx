import React from 'react'
import {Modal} from '@mui/material';

export type ModalControlProps = {
    status: boolean,
    handleClose: any,
    children: any
}

export const ModalControl = (props: ModalControlProps) => {
    return (
        <Modal open={props.status} onClose={props.handleClose}>
            {props.children}
        </Modal>
    )
}
