import React from 'react'
import {GridColDef } from '@mui/x-data-grid';
import {Button} from '@mui/material';
import {EditVolunteerState, useEditVolunteerStore} from 'src/components/volunteers/volunteer.store';
import { useNavigate } from "react-router-dom";

export const volunteerColumns: GridColDef[] = [
    {
        field: 'id',
        type: 'number',
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
    // {
    //     field: 'phoneNumber',
    //     type: 'number'
    // },
    {
        field: "edit",
        headerName: "",
        disableColumnMenu: true,
        sortable: false,
        renderCell: (cellValues) => {
            const setId = useEditVolunteerStore((state: EditVolunteerState) => state.setId)

            const onClick = (e: any) => {
                e.stopPropagation(); // don't select this row after clicking

                setId(cellValues.row.id)
        
                return console.log("click to edit", cellValues.row);
            };
        
            return <Button sx={{width: '100%'}} onClick={onClick}>Edit</Button>;
        }
    },
    {
        field: "viewTasksButton",
        headerName: "",
        disableColumnMenu: true,
        sortable: false,
        renderCell: (cellValues) => {
            const navigate = useNavigate();

            const onClick = (e: any) => {
                e.stopPropagation();
                navigate("/tasks?volunteerId=" + cellValues.row.id)
            };
        
            return <Button sx={{width: '100%'}} onClick={onClick}>View tasks</Button>;
        }
    },
];
