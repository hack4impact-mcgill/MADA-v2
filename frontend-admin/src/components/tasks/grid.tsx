import React, {useState} from 'react'
import {GridColDef} from '@mui/x-data-grid';

function getName(params: any) {
    return `${params.row.volunteer.name || ''}`;
}

function getVolunteerId(params: any) {
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
    }
];