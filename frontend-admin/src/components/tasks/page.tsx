import React, {useState} from 'react'
import NewTaskModalContents from './new-task'
import {taskColumns} from './columns'
import GridPage from 'src/components/common/grid/page'
import {
    useQuery,
} from '@tanstack/react-query'
import {getTasks} from 'src/api/tasks'
import { useSearchParams } from "react-router-dom";
import {getURLParamsFromFilter, getFilterFromURLParams} from './utils';
import {ActionProps} from 'src/components/common/page-actionbar'
import {useModalState} from 'src/components/common/use-modal-state';

const TasksPage = () => {
    const { isLoading, isError, data, error } = useQuery(['tasks'], () => getTasks())
    const {state: createModal, handleOpen: handleOpenCreateModal, handleClose: handleCloseCreateModal} = useModalState()

    const [urlFilterParams, setURLFilterParams] = useSearchParams();
    const [filter, setFilter] = useState<any>([])
    
    React.useEffect(() => {
        setFilter(getFilterFromURLParams(urlFilterParams))
    }, []);

    const handleFilterModelChange = (model: any) => {
        setURLFilterParams(getURLParamsFromFilter(model.items));
        setFilter(model.items)
    }

    const actionBarProps: ActionProps[] = [
        {
            handler: handleOpenCreateModal,
            label: "Create task"
        }
    ]
    
    const modalControls = [
        {
            status: createModal,
            handleClose: handleCloseCreateModal,
            children: <NewTaskModalContents handleClose={handleCloseCreateModal}/>
        },
    ]

    const gridCondition = isLoading

    const gridProps = {
        rows: data ? data!.data.tasks : [],
        columns: taskColumns,
        filter: filter,
        initalState: {
            columns: {
                columnVisibilityModel: {
                    volunteerId: false,
                },
            },
        },
        handleFilterModelChange: handleFilterModelChange
    }

    const gridPageProps = {
        actionBarProps: actionBarProps,
        modalControls: modalControls,
        gridCondition: gridCondition,
        gridProps: gridProps
    }

    return (
        <GridPage {...gridPageProps}/>
    )
}

export default TasksPage;