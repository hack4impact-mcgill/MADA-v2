import React from 'react'

import {useQuery} from '@tanstack/react-query'
import {GridRowId, GridActionsCellItem} from '@mui/x-data-grid';
import { useNavigate } from "react-router-dom";

import {volunteerColumns} from './columns';
import {ActionProps} from 'src/components/common/page-actionbar'
import {useModalState} from 'src/components/common/use-modal-state';

import {CreateModal, EditModal, NotifModal} from './modals'
import GridPage from 'src/components/common/grid/page';

import {getVolunteers} from 'src/api/volunteers'
import {EditVolunteerState, useEditVolunteerStore} from 'src/components/volunteers/volunteer.store';

const VolunteersPage = () => {
    const navigate = useNavigate()
    const { isLoading, isError, data, error } = useQuery(['volunteers'], () => getVolunteers())
    const {state: createModal, handleOpen: handleOpenCreateModal, handleClose: handleCloseCreateModal} = useModalState()
    const {state: notifModal, handleOpen: handleOpenNotifModal, handleClose: handleCloseNotifModal} = useModalState()
    const {state: editModal, handleOpen: handleOpenEditModal, handleClose: handleCloseEditModal} = useModalState()

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
            handleOpenEditModal()
        },
        [],
    );

    const actionColumns = [
        {
            field: 'actions',
            type: 'actions',
            getActions: (params: any) => [
                <GridActionsCellItem
                    label="View tasks"
                    onClick={handleViewTasks(params.id)}
                    showInMenu
                />,
                <GridActionsCellItem
                    label="Edit"
                    onClick={handleEdit(params.id)}
                    showInMenu
                />,
            ],
        }
    ]

    const actionBarProps: ActionProps[] = [
        {
            handler: handleOpenNotifModal,
            label: "Create notification"
        },
        {
            handler: handleOpenCreateModal,
            label: "Create volunteer"
        }
    ]

    const modalControls = [
        {
            status: createModal,
            handleClose: handleCloseCreateModal,
            children: <CreateModal handleClose={handleCloseCreateModal}/>
        },
        {
            status: notifModal,
            handleClose: handleCloseNotifModal,
            children: <NotifModal handleClose={handleCloseNotifModal}/>
        },
        {
            status: editModal,
            handleClose: handleCloseEditModal,
            children: <EditModal handleClose={handleCloseEditModal}/>
        },
    ]

    const gridCondition = isLoading

    const gridProps = {
        rows: data ? data!.data.volunteers : [],
        columns: [...volunteerColumns, ...actionColumns],
        filter: [],
        initalState: {},
    }

    const gridPageProps = {
        actionBarProps: actionBarProps,
        modalControls: modalControls,
        gridCondition: gridCondition,
        gridProps: gridProps
    }

    return (<GridPage {...gridPageProps}/>)
}

export default VolunteersPage;