import React, {useState} from 'react'
import {Box, Container, Button, Modal} from '@mui/material';
import {Page} from 'src/components/common/drawer'
import NewTaskModalContents from './new-task'
import {taskColumns} from './grid'
import {BaseGrid} from 'src/components/common/grid'
import {
    useQuery,
} from '@tanstack/react-query'
import {getTasks} from 'src/api/tasks'
import { useSearchParams } from "react-router-dom";

const toVolunteerFilter = (volunteerId: string) => {
    return [{ field: 'volunteerId', operator: '=', value: parseInt(volunteerId)}]
}

const TasksPage = () => {
    const { isLoading, isError, data, error } = useQuery(['tasks'], () => getTasks())
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [filterParams, setFilterParams] = useSearchParams();
    const paramVolunteerId = filterParams.get('volunteerId')

    const [filter, setFilter] = useState<any>(paramVolunteerId ? toVolunteerFilter(paramVolunteerId) : [])
    
    return (
        <Page>
            <Container sx={{width: '100%', height: '100vh' }} maxWidth={false}>
                <Button variant="outlined" onClick={handleOpen}>Create Task</Button>
                <Modal open={open} onClose={handleClose}>   
                    <NewTaskModalContents handleClose={handleClose}/>
                </Modal>
                
                { isLoading ? <Box>Loading...</Box> :
                    <BaseGrid
                        rows={data!.data.tasks}
                        columns={taskColumns}
                        filter={filter}
                        initalState={{
                            columns: {
                                columnVisibilityModel: {
                                        volunteerId: false,
                                    },
                                },
                            }
                        }
                    />
                }
            </Container>
        </Page>
    )
}

export default TasksPage;