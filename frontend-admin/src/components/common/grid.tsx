import React, {useState} from 'react'
import {Box} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

export const BaseGrid = (props: {rows: any[], filter: any[], columns: any[], initalState: any}) => {
    const {rows, filter, columns, initalState} = props
    
    return (<>
        <Box sx={{display: 'flex', flexDirection: 'column', width: '100%', height: '90%' }}>
            <DataGrid
                rows={rows}
                columns={columns}
                disableColumnSelector
                filterModel={{
                    items: filter
                }}
                initialState={initalState}
            />
        </Box>
    </>)
}