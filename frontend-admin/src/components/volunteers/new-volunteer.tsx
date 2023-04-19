import React from 'react'
import {
    useMutation,
    useQueryClient,
} from '@tanstack/react-query'
import {createVolunteer} from 'src/api/volunteers'
import { Dayjs } from 'dayjs';
import BaseModal from 'src/components/common/modal/modal'

const NewVolunteerModalContents = (props: {handleClose: any}) => {
    const queryClient = useQueryClient()

    const mutation = useMutation(createVolunteer, {
        onSuccess: () => {
            // Invalidate and refetch
            queryClient.invalidateQueries('volunteers')
        },
    })

    const [name, setName] = React.useState('');
    const [username, setUsername] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [date, setDate] = React.useState<Dayjs | null>(null);

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {setName(event.target.value)};
    const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {setUsername(event.target.value)};
    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {setEmail(event.target.value)};

    const handleCreate = () => {
        mutation.mutate({
            name: name,
            username: username,
            password: 'test',
            email: email,
            phoneNumber: 21334
        })
        props.handleClose()
    }
    
    const handleCancel = () => {
        console.log("cancel")
    }

    return (
        <BaseModal
            title={"Create new volunteer"}
            modalActionBarProps={{
                primaryActionProps: {
                    handlePrimary: handleCreate,
                    labelPrimary: "Create"
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
                {
                    label: "Start Date",
                    type: 'date',
                    stateValue: date,
                    stateSetter: (d: any) => setDate(d)
                },
            ]}
        />
    )
}

export default NewVolunteerModalContents;