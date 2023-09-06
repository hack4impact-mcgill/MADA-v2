import React, {useState} from 'react'
import {Box, Button} from '@mui/material'

export const EditRouteButtons = (props: {
    handleCreateRoute: any,
    handleDeleteRoute: any,
    disabledDeleteRoute: boolean,
    handleIncrementPosition: any,
    disabledIncrementPosition: boolean,
    handleDecrementPosition: any,
    disabledDecrementPosition: boolean,
}) => {
    const {
        handleCreateRoute, handleDeleteRoute, disabledDeleteRoute,
        handleIncrementPosition, disabledIncrementPosition,
        handleDecrementPosition, disabledDecrementPosition,
    } = props
    return (
        <Box sx={{display: 'flex', flexDirection: 'column', mx: 2}}>
            <Button
                variant="outlined"
                onClick={handleCreateRoute}
                size="small"
            >
                Create new route
            </Button>
            <Button
                variant="outlined"
                onClick={handleDeleteRoute}
                disabled={disabledDeleteRoute}
                size="small"
            >
                Delete route
            </Button>
            <Box sx={{display: 'flex', width: '100%'}}>
                <Button
                    variant="outlined"
                    size="small"
                    sx={{flexGrow: 1}}
                    onClick={handleDecrementPosition}
                    disabled={disabledDecrementPosition}
                >
                    {"↑"}
                </Button>
                <Button
                    variant="outlined"
                    size="small"
                    sx={{flexGrow: 1}}
                    onClick={handleIncrementPosition}
                    disabled={disabledIncrementPosition}
                >
                    {"↓"}
                </Button>
            </Box>
        </Box>
    )
}
