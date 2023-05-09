import React, {useState} from 'react'
import {Box, Button} from '@mui/material'

export const TransferButtons = (props: {
    handleTransferRight?: any,
    disabledTransferRight?: boolean,
    handleTransferLeft?: any,
    disabledTransferLeft?: boolean
}) => {
    const {handleTransferRight, disabledTransferRight, handleTransferLeft, disabledTransferLeft} = props

    return (
        <Box sx={{display: 'flex', flexDirection: 'column', mx: 2}}>
            <Button
                variant="outlined"
                size="small"
                onClick={handleTransferRight}
                disabled={disabledTransferRight}
            >
                {">"}
            </Button>
            <Button
                variant="outlined"
                size="small"
                onClick={handleTransferLeft}
                disabled={disabledTransferLeft}
            >
                {"<"}
            </Button>
        </Box>
    )
}
