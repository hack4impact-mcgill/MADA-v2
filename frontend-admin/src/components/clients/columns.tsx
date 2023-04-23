import React from 'react'
import {GridColDef} from '@mui/x-data-grid';
import * as dayjs from 'dayjs'

export const clientColumns: GridColDef[] = [
    {
        field: 'id',
        type: 'number',
        width: 20
    },
    {
        field: 'name',
        headerName: 'Name',
        type: 'string',
        width: 150,
        sortable: true,
    },
    {
        field: 'email',
        headerName: 'Email',
        type: 'string',
        width: 250,
    },
    {
        field: 'address',
        headerName: 'Address',
        type: 'string',
        width: 200,
    },
    {
        field: 'phoneNumber',
        headerName: 'Phone',
        type: 'string',
        width: 200,
    },
];