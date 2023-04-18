import React from 'react'
import {
    useQuery,
} from '@tanstack/react-query'
import {getVolunteers} from 'src/api/volunteers'
import NewVolunteerModalContents from './new-volunteer'
import EditVolunteerModalContents from './edit-volunteer'
import mockVolunteerData from 'src/components/mockdata/volunteers';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import {Box, Container, Button, Divider, Modal} from '@mui/material';
import {Page} from 'src/components/common/drawer'
import {EditVolunteerState, useEditVolunteerStore} from 'src/components/volunteers/volunteer.store';

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
];

const VolunteersPage = () => {
    const { isLoading, isError, data, error } = useQuery(['volunteers'], () => getVolunteers())
    const [openCreateModal, setOpenCreateModal] = React.useState(false);
    const handleOpenCreateModal = () => setOpenCreateModal(true);
    const handleCloseCreateModal = () => setOpenCreateModal(false);

    const handleCloseEditModal = () => setId(-1);
    const id = useEditVolunteerStore((state: EditVolunteerState) => state.id)
    const setId = useEditVolunteerStore((state: EditVolunteerState) => state.setId)

    return (
        <Page>
            <Container sx={{width: '100%', height: '100vh' }} maxWidth={false}>
                <Button variant="outlined" onClick={handleOpenCreateModal}>Create Volunteer</Button>
                
                <Modal open={openCreateModal} onClose={handleCloseCreateModal}>   
                    <NewVolunteerModalContents handleClose={handleCloseCreateModal}/>
                </Modal>

                <Modal open={id !== -1} onClose={handleCloseEditModal}>   
                    <EditVolunteerModalContents />
                </Modal>
                
                {
                    isLoading ?
                        <Box>Loading...</Box>
                    :
                        <Box sx={{display: 'flex', flexDirection: 'column', width: '100%', height: '90%' }}>
                            <DataGrid
                                rows={data!.data.volunteers} // mockVolunteerData
                                columns={columns}
                                disableColumnSelector
                            />
                        </Box>
                }
            </Container>
        </Page>
    )
}

export default VolunteersPage;