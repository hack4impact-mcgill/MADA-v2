
import React, {useState} from 'react'
import {BoardList} from './list'
import {Grid, Box} from '@mui/material'

export const ViewBoard = (props: {groupedRoutes: any}) => {
    return (
        <Box sx={{display: 'flex', overflow: 'auto'}}>
            <BoardList header={""} routes={props.groupedRoutes[0]}/>
            {/* <BoardList header={"Route 1"}/>
            <BoardList header={"Route 2"}/>
            <BoardList header={"Route 3"}/> */}
        </Box>
    )
}