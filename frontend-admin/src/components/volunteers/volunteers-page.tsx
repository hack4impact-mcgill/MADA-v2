import React from 'react'
import {
    useQuery,
} from '@tanstack/react-query'
import {getVolunteers} from 'src/api/volunteers'
import NewVolunteerModalContents from './new-volunteer'
import EditVolunteerModalContents from './edit-volunteer'
import {Box, Container, Button, Divider, Modal} from '@mui/material';
import {Page} from 'src/components/common/drawer'
import {EditVolunteerState, useEditVolunteerStore} from 'src/components/volunteers/volunteer.store';
import {volunteerColumns} from './grid';
import {BaseGrid} from 'src/components/common/grid';
import {GridRowId, GridActionsCellItem} from '@mui/x-data-grid';
import { useNavigate } from "react-router-dom";
import {PageActionBar, ActionProps} from 'src/components/common/page-actionbar'

const VolunteersPage = () => {
    const navigate = useNavigate()
    const { isLoading, isError, data, error } = useQuery(['volunteers'], () => getVolunteers())
    const [openCreateModal, setOpenCreateModal] = React.useState(false);
    const handleOpenCreateModal = () => setOpenCreateModal(true);
    const handleCloseCreateModal = () => setOpenCreateModal(false);

    const handleCloseEditModal = () => {
        setId(-1)
    };

    const id = useEditVolunteerStore((state: EditVolunteerState) => state.id)
    const setId = useEditVolunteerStore((state: EditVolunteerState) => state.setId)

    const handleViewTasks = React.useCallback(
        (id: GridRowId) => () => {
            navigate("/tasks?volunteerId.%3D=" + id)
        },
        [],
    );

    const handleEdit = React.useCallback(
        (id: GridRowId) => () => {
            setId(id)
        },
        [],
    );

    const actionColumns = [
        {
            field: 'actions',
            type: 'actions',
            getActions: (params: any) => [
                <GridActionsCellItem
                    label="Edit"
                    onClick={handleEdit(params.id)}
                    showInMenu
                />,
                <GridActionsCellItem
                    label="View tasks"
                    onClick={handleViewTasks(params.id)}
                    showInMenu
                />,
            ],
        }
    ]

    const handleSendNotification = () => {
        console.log("Send notification")
    }

    const actionBarProps: ActionProps[] = [
        {
            handler: handleSendNotification,
            label: "Send notification"
        },
        {
            handler: handleOpenCreateModal,
            label: "Create volunteer"
        }
    ]
    
    return (
        <Page>
            <Container sx={{width: '100%', height: '100vh' }} maxWidth={false}>
                <PageActionBar actions={actionBarProps}/>

                <Modal open={openCreateModal} onClose={handleCloseCreateModal}>   
                    <NewVolunteerModalContents handleClose={handleCloseCreateModal}/>
                </Modal>

                <Modal open={id !== -1} onClose={handleCloseEditModal}>   
                    <EditVolunteerModalContents />
                </Modal>
                
                { isLoading ? <Box>Loading...</Box> :
                    <BaseGrid
                        rows={data!.data.volunteers}
                        columns={[...volunteerColumns, ...actionColumns]}
                        filter={[]}
                        initalState={{}}
                    />
                }
            </Container>
        </Page>
    )
}

export default VolunteersPage;