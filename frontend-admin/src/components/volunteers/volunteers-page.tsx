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
import {volunteerColumns} from './grid';
import {BaseGrid} from 'src/components/common/grid';

const VolunteersPage = () => {
    const { isLoading, isError, data, error } = useQuery(['volunteers'], () => getVolunteers())
    const [openCreateModal, setOpenCreateModal] = React.useState(false);
    const handleOpenCreateModal = () => setOpenCreateModal(true);
    const handleCloseCreateModal = () => setOpenCreateModal(false);

    const handleCloseEditModal = () => {
        setId(-1)
    };

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
                
                { isLoading ? <Box>Loading...</Box> :
                    <BaseGrid
                        rows={data!.data.volunteers}
                        columns={volunteerColumns}
                        filter={[]}
                        initalState={{}}
                    />
                }
            </Container>
        </Page>
    )
}

export default VolunteersPage;