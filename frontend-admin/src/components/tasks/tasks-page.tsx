import React from 'react'
import {Box, Container, Button, Modal} from '@mui/material';
import {Page} from 'src/components/common/drawer'
import { DataGrid, GridColDef } from '@mui/x-data-grid';

const columns: GridColDef[] = [
    {
        field: 'id',
        type: 'number',
    },
    {
        field: 'isCompleted',
        type: 'boolean',
    }
];

const TasksPage = () => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    
    return (
        <Page>
            <Container sx={{width: '100%', height: '100vh' }} maxWidth={false}>
                <Button variant="outlined" onClick={handleOpen}>Create Task</Button>
                <Modal open={open} onClose={handleClose}>   
                    <div>new task</div>
                </Modal>

                <Box sx={{display: 'flex', flexDirection: 'column', width: '100%', height: '90%' }}>
                    <DataGrid
                        rows={[]}
                        columns={columns}
                        disableColumnSelector
                    />
                </Box>
            </Container>
        </Page>
    )
}

export default TasksPage;