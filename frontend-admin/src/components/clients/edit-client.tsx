import React, {useEffect} from 'react'
import {EditClientState, useEditClientStore} from './client.store';
import {getClient, editClient} from 'src/api/clients'
import BaseModal from 'src/components/common/modal/modal'
import {useStateSetupHandler} from 'src/components/common/use-state-setup-handler';

import {
    useQuery,
    useMutation,
    QueryClient
} from '@tanstack/react-query'

const EditClientModalContents = () => {
    const id = useEditClientStore((state: EditClientState) => state.id)
    const setId = useEditClientStore((state: EditClientState) => state.setId)

    const { data } = useQuery({
        queryKey: ['clients', id],
        queryFn: () => getClient(id)
    })

    const {state: name, setState: setName, handler: handleNameChange} = useStateSetupHandler('');
    const {state: username, setState: setUsername, handler: handleUsernameChange} = useStateSetupHandler('');
    const {state: email, setState: setEmail, handler: handleEmailChange} = useStateSetupHandler('');

    useEffect(() => {
        if (data) {
            setName(data!.data.client.name);
            setUsername(data!.data.client.username);
            setEmail(data!.data.client.email);
        }
    }, [data]);
    
    const queryClient = new QueryClient()

    const mutation = useMutation(editClient, {
        onSuccess: () => {
            // Invalidate and refetch
            queryClient.invalidateQueries('clients')
        },
    })
    
    const handleSave = async () => {
        await mutation.mutate({
            id: id,
            data: {
                name: name,
                username: username,
                email: email,
            }
        })
        setId(-1)
    }
    
    const handleCancel = () => {
        setId(-1)
    }
    
    const handleDelete = () => {
        console.log("alert to delete")
        //setId(-1)
    }

    return (
        <BaseModal
            title={"Edit " + name}
            modalActionBarProps={{
                primaryActionProps: {
                    handlePrimary: handleSave,
                    labelPrimary: "Save"
                },
                secondaryActionProps: [
                    {
                        handle: handleCancel,
                        label: "Cancel"
                    },
                    {
                        handle: handleDelete,
                        label: "Delete"
                    }
                ]
            }}
            modalInputProps={[
                {
                    label: "Name",
                    stateValue: name,
                    stateSetter: handleNameChange
                },
                {
                    label: "Email",
                    stateValue: email,
                    stateSetter: handleEmailChange
                },
                {
                    label: "Username",
                    stateValue: username,
                    stateSetter: handleUsernameChange
                },
            ]}
        />
    )
}

export default EditClientModalContents;