import React from 'react'
import {GridColDef} from '@mui/x-data-grid';

function getClientName(params: any) {
    if (params.row.client === null) return '';
    return `${params.row.client.name || ''}`;
}

function getClientAddress(params: any) {
    if (params.row.client === null) return '';
    return `${params.row.client.address || ''}`;
}

export const routeColumns: GridColDef[] = [
    {
        field: 'id',
        type: 'number',
        width: 20,
    },
    {
        field: 'routeNumber',
        headerName: 'Route Number',
        type: 'number',
    },
    {
        field: 'routePosition',
        headerName: 'Route Position',
        type: 'number',
    },
    {
        field: 'mealType',
        headerName: 'Meal Type',
        type: 'string',
    },
    {
        field: 'program',
        headerName: 'Program Type',
        type: 'string',
    },
    {
        field: 'clientName',
        headerName: 'Client Name',
        type: 'string',
        width: 150,
        valueGetter: getClientName,
    },
    {
        field: 'clientAddress',
        headerName: 'Client Address',
        type: 'string',
        width: 200,
        valueGetter: getClientAddress,
    },
];
