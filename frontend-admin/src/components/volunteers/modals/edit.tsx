import React, {useEffect} from 'react'
import {EditVolunteerState, useEditVolunteerStore} from 'src/components/volunteers/volunteer.store';
import {getVolunteer, editVolunteer, getVolunteers} from 'src/api/volunteers'
import BaseModal from 'src/components/common/modal/modal'
import {useStateSetupHandler} from 'src/components/common/use-state-setup-handler';

import {
    useQuery,
    useMutation,
    QueryClient
} from '@tanstack/react-query'

export const EditModal = (props: {handleClose: any}) => {
    const id = useEditVolunteerStore((state: EditVolunteerState) => state.id)
    const setId = useEditVolunteerStore((state: EditVolunteerState) => state.setId)

    const { data } = useQuery({
        queryKey: ['volunteers', id],
        queryFn: () => getVolunteer(id)
    })

    const {state: name, setState: setName, handler: handleNameChange} = useStateSetupHandler('');
    const {state: username, setState: setUsername, handler: handleUsernameChange} = useStateSetupHandler('');
    const {state: email, setState: setEmail, handler: handleEmailChange} = useStateSetupHandler('');

    useEffect(() => {
        if (data) {
            setName(data!.data.volunteer.name);
            setUsername(data!.data.volunteer.username);
            setEmail(data!.data.volunteer.email);
        }
    }, [data]);
    
    const queryClient = new QueryClient()

    const mutation = useMutation(editVolunteer, {
        onSuccess: () => {
            // Invalidate and refetch
            queryClient.invalidateQueries('volunteers')
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
        props.handleClose()
    }
    
    const handleCancel = () => {
        setId(-1)
        props.handleClose()
    }
    
    const handleDelete = () => {
        console.log("alert to delete")
        setId(-1)
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