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
        field: 'username',
        type: 'string',
        width: 150
    },
    {
        field: 'name',
        type: 'string',
        width: 150,
        sortable: true,
    },
    {
        field: 'email',
        type: 'string',
        width: 300,
    },
    {
        field: 'address',
        type: 'string',
        width: 200,
    },
    {
        field: 'phoneNumber',
        type: 'string',
        width: 150,
    },
];