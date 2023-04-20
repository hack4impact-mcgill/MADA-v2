import React from 'react'
import {Box, Container, Button, Modal} from '@mui/material';
import { GridActionsCellItem, GridRowId } from '@mui/x-data-grid';
import {Page} from 'src/components/common/drawer'
import NewClientModalContents from './new-client'
import {getClients} from 'src/api/clients'
import {useEditClientStore, EditClientState} from './client.store'
import EditClientModalContents from './edit-client'
import {
    useQuery,
} from '@tanstack/react-query'
import {BaseGrid} from 'src/components/common/grid';
import {clientColumns} from './columns';

const ClientsPage = () => {
    const { isLoading, isError, data, error } = useQuery(['clients'], () => getClients())

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const id = useEditClientStore((state: EditClientState) => state.id)
    const setId = useEditClientStore((state: EditClientState) => state.setId)
    
    const handleCloseEditModal = () => {
        setId(-1)
    };
    
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
            ],
        }
    ]

    return (
        <Page>
            <Container sx={{width: '100%', height: '100vh' }} maxWidth={false}>
                <Button variant="outlined" onClick={handleOpen}>Create Client</Button>
                <Modal open={open} onClose={handleClose}>   
                    <NewClientModalContents handleClose={handleClose}/>
                </Modal>

                <Modal open={id !== -1} onClose={handleCloseEditModal}>   
                    <EditClientModalContents />    
                </Modal>
                
                {   isLoading ? <Box>Loading...</Box> :
                    <BaseGrid
                        rows={data!.data.clients}
                        columns={[...clientColumns, ...actionColumns]}
                        filter={[]}
                        initalState={{}}
                    />
                }
            </Container>
        </Page>
    )
}

export default ClientsPage;