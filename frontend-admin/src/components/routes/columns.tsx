import React from 'react'
import {GridColDef} from '@mui/x-data-grid';

export const routeColumns: GridColDef[] = [
    {
        field: 'id',
        type: 'number',
        width: 20
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
];
