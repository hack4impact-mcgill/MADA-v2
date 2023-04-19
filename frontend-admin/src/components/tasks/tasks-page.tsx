import React, {useState} from 'react'
import {Box, Container, Button, Modal} from '@mui/material';
import {Page} from 'src/components/common/drawer'
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import NewTaskModalContents from './new-task'
import {
    useQuery,
} from '@tanstack/react-query'
import {getTasks} from 'src/api/tasks'

function getName(params: any) {
    return `${params.row.volunteer.name || ''}`;
}

const columns: GridColDef[] = [
    // {
    //     field: 'id',
    //     type: 'number',
    // },
    {
        field: 'isCompleted',
        headerName: 'Complete?',
        type: 'boolean',
    },
    {
        field: 'volunteer',
        headerName: 'Volunteer',
        type: 'string',
        valueGetter: getName,
        width: 200
    },
    {
        field: 'deliveryTime',
        headerName: 'Date',
        type: 'date',
        valueGetter: ({ value }) => value && new Date(value),
        width: 200
    }
];

const TasksPage = () => {
    const { isLoading, isError, data, error } = useQuery(['tasks'], () => getTasks())

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    
    const [filter, setFilter] = useState([])
    
    return (
        <Page>
            <Container sx={{width: '100%', height: '100vh' }} maxWidth={false}>
                <Button variant="outlined" onClick={handleOpen}>Create Task</Button>
                <Modal open={open} onClose={handleClose}>   
                    <NewTaskModalContents handleClose={handleClose}/>
                </Modal>
                
                {
                    isLoading ?
                        <Box>Loading...</Box>
                    :
                        <Box sx={{display: 'flex', flexDirection: 'column', width: '100%', height: '90%' }}>
                            <DataGrid
                                rows={data!.data.tasks}
                                columns={columns}
                                disableColumnSelector
                                filterModel={{
                                    items: filter
                                }}
                            />
                        </Box>
                }
            </Container>
        </Page>
    )
}

export default TasksPage;