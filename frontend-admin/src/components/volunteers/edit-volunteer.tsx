import React, {useEffect} from 'react'
import {EditVolunteerState, useEditVolunteerStore} from 'src/components/volunteers/volunteer.store';
import {getVolunteer, editVolunteer, getVolunteers} from 'src/api/volunteers'
import BaseModal from 'src/components/common/modal/modal'

import {
    useQuery,
    useMutation,
    QueryClient
} from '@tanstack/react-query'

const EditVolunteerModalContents = () => {
    const id = useEditVolunteerStore((state: EditVolunteerState) => state.id)
    const setId = useEditVolunteerStore((state: EditVolunteerState) => state.setId)

    const { isLoading, isError, data, error } = useQuery({
        queryKey: ['volunteers', id],
        queryFn: () => getVolunteer(id)
    })

    const [name, setName] = React.useState('');
    const [username, setUsername] = React.useState('');
    const [email, setEmail] = React.useState('');

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {setName(event.target.value)};
    const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {setUsername(event.target.value)};
    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {setEmail(event.target.value)};

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
    }
    
    const handleCancel = () => {
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

export default EditVolunteerModalContents;