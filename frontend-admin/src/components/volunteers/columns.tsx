import React from 'react'
import {GridColDef} from '@mui/x-data-grid';
import * as dayjs from 'dayjs'

function getDate(params: any) {
    if (params.row.startDate === null) return '';
    return `${dayjs(params.row.startDate).format("MM/DD/YYYY")}`;
}

export const volunteerColumns: GridColDef[] = [
    {
        field: 'id',
        type: 'number',
        width: 20
    },
    {
        field: 'username',
        headerName: 'Username',
        type: 'string',
        width: 150
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
        field: 'phoneNumber',
        headerName: 'Phone',
        type: 'string',
        width: 200,
    },
    {
        field: 'startDate',
        headerName: 'Start Date',
        type: 'string',
        valueGetter: getDate,
        width: 100,
    }
];
