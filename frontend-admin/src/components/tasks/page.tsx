import React, {useState} from 'react'
import {
    useQuery,
} from '@tanstack/react-query'
import {getTasks} from 'src/api/tasks'
import {BasePage} from 'src/components/common/base-page'
import {Box} from '@mui/material'
import {DataGrid} from '@mui/x-data-grid'
import { taskColumns } from './columns'

const TasksPage = () => {
    const { isLoading, isError, data, error } = useQuery(['tasks'], () => getTasks())
    
    return (
        <BasePage header={<div></div>}>
            <Box sx={{display: 'flex', flexDirection: 'column', width: '100%', height: '85%'}}>                
                <DataGrid
                    rows={data ? data!.data.tasks : []}
                    columns={taskColumns}
                    loading={isLoading}
                />
            </Box>
        </BasePage>
    )
}

export default TasksPage;