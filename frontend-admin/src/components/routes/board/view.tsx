
import React, {useState} from 'react'
import {BoardList} from './list'
import {Box} from '@mui/material'

export const ViewBoard = (props: {groupedRoutes: any}) => {
    return (
        <Box sx={{display: 'flex', overflow: 'auto'}}>
            <BoardList header={"Unassigned"} routes={props.groupedRoutes[0]}/>
            {
                Object.keys(props.groupedRoutes).slice(1).map((key, index) => 
                    <BoardList header={"Route" + key} routes={props.groupedRoutes[key]}/>
                )
            }
        </Box>
    )
}