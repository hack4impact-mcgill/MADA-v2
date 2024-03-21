import React, {useState} from 'react'
import {
    useQuery,
} from '@tanstack/react-query'
import {getTasks} from 'src/api/tasks'
import {BasePage} from 'src/components/common/layout/base-page'
import {Box} from '@mui/material'
import {DataGrid} from '@mui/x-data-grid'
import { taskColumns } from './columns'
import { ModalControl } from "src/components/common/modal/control";
import { useModalState } from "src/components/common/modal/use-modal-state";
import { CreateModal } from "./modals";
import { ActionBar } from "src/components/common/layout/page-actionbar";

const TasksPage = () => {
    const { isLoading, isError, data, error } = useQuery(['tasks'], () => getTasks())
    const {
        state: createModal,
        handleOpen: handleOpenCreateModal,
        handleClose: handleCloseCreateModal,
    } = useModalState();
    
    const Header = () => {
        return (
          <ActionBar
            actions={[
              {
                handler: handleOpenCreateModal,
                label: "Create Tasks",
              },
            ]}
          />
        );
    };

    const CreateModalControl = () => {
        return (
            <ModalControl
                {...{
                status: createModal,
                handleClose: handleCloseCreateModal,
                children: <CreateModal handleClose={handleCloseCreateModal} />,
                }}
            />
        );
    };

    return (
        <BasePage header={<Header/>}>
            <CreateModalControl />
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