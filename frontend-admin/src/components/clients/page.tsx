import React from 'react'
import { GridActionsCellItem, GridRowId } from '@mui/x-data-grid';
import {CreateModal, EditModal} from './modals'
import {getClients} from 'src/api/clients'
import {useEditClientStore, EditClientState} from './client.store'
import {useQuery} from '@tanstack/react-query'
import {clientColumns} from './columns';
import {PageActionBar, ActionProps} from 'src/components/common/page-actionbar'
import GridPage from 'src/components/common/grid/page';
import {useModalState} from 'src/components/common/use-modal-state';

const ClientsPage = () => {
    const { isLoading, isError, data, error } = useQuery(['clients'], () => getClients())
    const {state: createModal, handleOpen: handleOpenCreateModal, handleClose: handleCloseCreateModal} = useModalState()
    const {state: editModal, handleOpen: handleOpenEditModal, handleClose: handleCloseEditModal} = useModalState()

    const setId = useEditClientStore((state: EditClientState) => state.setId)
    
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
                    label="Edit"
                    onClick={handleEdit(params.id)}
                    showInMenu
                />,
            ],
        }
    ]

    const actionBarProps: ActionProps[] = [
        {
            handler: handleOpenCreateModal,
            label: "Create client"
        }
    ]

    
    const modalControls = [
        {
            status: createModal,
            handleClose: handleCloseCreateModal,
            children: <CreateModal handleClose={handleCloseCreateModal}/>
        },
        {
            status: editModal,
            handleClose: handleCloseEditModal,
            children: <EditModal handleClose={handleCloseEditModal}/>
        },
    ]

    const gridCondition = isLoading

    const gridProps = {
        rows: data ? data!.data.clients : [],
        columns: [...clientColumns, ...actionColumns],
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

export default ClientsPage;