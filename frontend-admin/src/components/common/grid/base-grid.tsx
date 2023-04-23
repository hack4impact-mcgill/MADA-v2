import React, {useState} from 'react'
import {Button, Box} from '@mui/material';
import { GridFooterContainer, GridFooter, DataGrid, GridSlotsComponentsProps } from '@mui/x-data-grid';
import {FooterStatus, Footer} from './task-footer'

export type BaseGridProps = {
    rows: any[],
    filter: any[],
    columns: any[],
    initalState: any,
    handleFilterModelChange?: any
    setFilter?: any
    setURLFilterParams?: any
}

export const BaseGrid = (props: BaseGridProps) => {
    const {rows, filter, columns, initalState, handleFilterModelChange, setFilter, setURLFilterParams} = props
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
                onFilterModelChange={handleFilterModelChange ? handleFilterModelChange : () => {}}
                initialState={initalState}
                {...handleFilterModelChange ? {
                    components: {Footer: Footer},
                    slotProps: {footer: { status, setStatus, setFilter, setURLFilterParams }}
                } : {}}
            />
        </Box>
    </>)
}
