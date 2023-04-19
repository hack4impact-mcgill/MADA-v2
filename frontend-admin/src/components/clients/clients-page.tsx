import React from 'react'
import {Box, Container, Button, Modal} from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import {Page} from 'src/components/common/drawer'
import NewClientModalContents from './new-client'
import {getClients} from 'src/api/clients'

import {
    useQuery,
} from '@tanstack/react-query'

const columns: GridColDef[] = [
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
    {
        field: 'address',
        type: 'string',
        width: 200,
    },
    {
        field: "edit",
        headerName: "",
        disableColumnMenu: true,
        sortable: false,
        renderCell: (params) => {
            const onClick = (e: any) => {
                e.stopPropagation(); // don't select this row after clicking
        
                return console.log("click to edit");
            };
        
            return <Button sx={{width: '100%'}} onClick={onClick}>Edit</Button>;
        }
      },
];

const ClientsPage = () => {
    const { isLoading, isError, data, error } = useQuery(['clients'], () => getClients())

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <Page>
            <Container sx={{width: '100%', height: '100vh' }} maxWidth={false}>
                <Button variant="outlined" onClick={handleOpen}>Create Client</Button>
                <Modal open={open} onClose={handleClose}>   
                    <NewClientModalContents/>
                </Modal>
                
                {
                    isLoading ?
                        <Box>Loading...</Box>
                    :
                        <Box sx={{display: 'flex', flexDirection: 'column', width: '100%', height: '90%' }}>
                            <DataGrid
                                rows={data.data.clients}
                                columns={columns}
                                disableColumnSelector
                            />
                        </Box>
                }
            </Container>
        </Page>
    )
}

export default ClientsPage;