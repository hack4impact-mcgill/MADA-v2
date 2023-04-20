import React, {useState} from 'react'
import {GridColDef} from '@mui/x-data-grid';
import {Box, Container, Button, Modal} from '@mui/material';

function getName(params: any) {
    if (params.row.volunteer === null) return '';
    return `${params.row.volunteer.name || ''}`;
}

function getVolunteerId(params: any) {
    if (params.row.volunteer === null) return '';
    return `${params.row.volunteer.id || ''}`;
}

export const taskColumns: GridColDef[] = [
    {
        field: 'id',
        type: 'number'
    },
    {
        field: 'isCompleted',
        headerName: 'Complete?',
        type: 'boolean',
    },
    {
        field: 'volunteer',
        headerName: 'Volunteer',
        type: 'string',
        valueGetter: getName,
        width: 200
    },
    {
        field: 'volunteerId',
        headerName: 'Volunteer ID',
        type: 'number',
        valueGetter: getVolunteerId
    },
    {
        field: 'deliveryTime',
        headerName: 'Date',
        type: 'date',
        valueGetter: ({ value }) => value && new Date(value),
        width: 200
    },
    {
        field: "deliveries",
        headerName: "Clients",
        disableColumnMenu: true,
        sortable: false,
        renderCell: (cellValues) => {
            return (<Box>
                {cellValues.row.deliveries.map((delivery: any) => {
                    return <Box>{delivery.client.name} ({delivery.quantity})</Box>
                })}
            </Box>);
        },
        width: 200
    },
];