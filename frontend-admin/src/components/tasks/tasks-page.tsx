import React, {useState} from 'react'
import {Box, Container, Button, Modal} from '@mui/material';
import {BasePage} from 'src/components/common/base-page'
import NewTaskModalContents from './new-task'
import {taskColumns} from './grid'
import {BaseGrid} from 'src/components/common/grid/base-grid'
import {
    useQuery,
} from '@tanstack/react-query'
import {getTasks} from 'src/api/tasks'
import { useSearchParams } from "react-router-dom";

export const getURLParamsFromFilter = (items: any[]) => {
    const prepParams = items.map((item: any) => {
        return [item.field+"."+item.operator, item.value]
    })
    const params = new URLSearchParams(prepParams);
    return params
}

export const getFilterFromURLParams = (urlFilterParams: URLSearchParams) => {
    const filter = []
    for (const entry of urlFilterParams.entries()) {
        const field = entry[0].split('.')[0]
        const operator = entry[0].split('.')[1]
        const value = entry[1]
        filter.push({ field: field, operator: operator, value: value})
    }

    return filter
}

const TasksPage = () => {
    const { isLoading, isError, data, error } = useQuery(['tasks'], () => getTasks())
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [urlFilterParams, setURLFilterParams] = useSearchParams();
    const [filter, setFilter] = useState<any>([])
    
    React.useEffect(() => {
        setFilter(getFilterFromURLParams(urlFilterParams))
    }, []);

    const handleFilterModelChange = (model: any) => {
        setURLFilterParams(getURLParamsFromFilter(model.items));
        setFilter(model.items)
    }

    return (
        <BasePage>
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
                        handleFilterModelChange={handleFilterModelChange}
                    />
                }
            </Container>
        </BasePage>
    )
}

export default TasksPage;