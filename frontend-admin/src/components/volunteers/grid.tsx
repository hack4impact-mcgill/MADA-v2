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
        field: 'phoneNumber',
        type: 'string',
        width: 200,
    },
    {
        field: 'startDate',
        type: 'string',
        valueGetter: getDate,
        width: 100,
    }
];
