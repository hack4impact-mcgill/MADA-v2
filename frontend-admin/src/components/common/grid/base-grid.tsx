import React, {useState} from 'react'
import {Box} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

export type BaseGridProps = {
    rows: any[],
    filter: any[],
    columns: any[],
    initalState: any,
    handleFilterModelChange?: any
}

export const BaseGrid = (props: BaseGridProps) => {
    const {rows, filter, columns, initalState, handleFilterModelChange} = props
    
    return (<>
        <Box sx={{display: 'flex', flexDirection: 'column', width: '100%', height: '85%' }}>
            <DataGrid
                rows={rows}
                columns={columns}
                disableColumnSelector
                filterModel={{
                    items: filter
                }}
                onFilterModelChange={handleFilterModelChange ? handleFilterModelChange : () => {}}
                initialState={initalState}
            />
        </Box>
    </>)
}
