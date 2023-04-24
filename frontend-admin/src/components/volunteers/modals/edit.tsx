import React, {useEffect} from 'react'
import {EditVolunteerState, useEditVolunteerStore} from 'src/components/volunteers/volunteer.store';
import {getVolunteer, editVolunteer, getVolunteers} from 'src/api/volunteers'
import BaseModal from 'src/components/common/modal/modal'
import {useStateSetupHandler} from 'src/components/common/use-state-setup-handler';
import {isValidEmail, isValidPhone} from 'src/components/common/validators';

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

    const [phone, setPhone] = React.useState("");
    const handlePhoneChange = (value: any) => {setPhone(value)}

    useEffect(() => {
        if (data) {
            setName(data!.data.volunteer.name);
            setUsername(data!.data.volunteer.username);
            setEmail(data!.data.volunteer.email);
            setPhone(data!.data.volunteer.phoneNumber);
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
                phoneNumber: phone
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
                    stateSetter: handleEmailChange,
                    valid: isValidEmail(email)
                },
                {
                    label: "Username",
                    stateValue: username,
                    stateSetter: handleUsernameChange
                },
                { 
                    label: "Phone Number",
                    type: 'phone',
                    stateValue: phone,
                    stateSetter: handlePhoneChange,
                    valid: isValidPhone(phone)
                },
            ]}
        />
    )
}