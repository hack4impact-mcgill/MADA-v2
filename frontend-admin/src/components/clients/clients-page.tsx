import React from 'react'
import mockClientData from 'src/components/mockdata/clients';
import {Box, Container, Button, Modal} from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import {Page} from 'src/components/common/drawer'
import NewClientModalContents from './new-client'

type ClientProps = {
    id: number,
    phoneNumber: number,
    startDate: Date,
} & GenericUserProps

const ClientRow = (props: ClientProps) => {
    return (
        <div>{props.name}</div>
    )
}


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
    // get list of clients from db

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
                
                <Box sx={{display: 'flex', flexDirection: 'column', width: '100%', height: '80%' }}>
                    <DataGrid
                        rows={mockClientData}
                        columns={columns}
                        disableColumnSelector
                    />
                </Box>
            </Container>
        </Page>
    )
}

export default ClientsPage;