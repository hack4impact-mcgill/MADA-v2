import React, {useState} from 'react'
import { Box, LinearProgress} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import {FooterStatus, Footer} from './task-footer'

export type BaseGridProps = {
    rows: any[],
    filter: any[],
    columns: any[],
    initalState: any,
    handleFilterModelChange?: any,
    gridCondition: boolean,
    setFilter?: any,
    setURLFilterParams?: any
}

export const BaseGrid = (props: BaseGridProps) => {
    const {rows, filter, columns, initalState, handleFilterModelChange, setFilter, gridCondition, setURLFilterParams} = props
    const [status, setStatus] = React.useState<FooterStatus>(null);
    
    return (<>
        <Box sx={{display: 'flex', flexDirection: 'column', width: '100%', height: '85%' }}>
            <DataGrid
                rows={rows}
                columns={columns}
                disableColumnSelector
                filterModel={{
                    items: filter
                }}
                loading={gridCondition}
                onFilterModelChange={handleFilterModelChange ? handleFilterModelChange : () => {}}
                initialState={initalState}
                slots={{
                    loadingOverlay: LinearProgress,
                    ...{...handleFilterModelChange ? {footer: Footer} : {}}
                }}
                {...handleFilterModelChange ? {slotProps: {footer: { status, setStatus, setFilter, setURLFilterParams }}} : {}}
            />
        </Box>
    </>)
}
