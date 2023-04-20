import React from 'react'
import {
    useMutation,
    useQueryClient,
} from '@tanstack/react-query'
import {createVolunteer} from 'src/api/volunteers'
import * as dayjs from 'dayjs'
import BaseModal from 'src/components/common/modal/modal'
import {useStateSetupHandler} from 'src/components/common/use-state-setup-handler';
import {isValidEmail, isValidPhone} from 'src/components/common/validators';

export const CreateModal = (props: {handleClose: any}) => {
    const queryClient = useQueryClient()

    const mutation = useMutation(createVolunteer, {
        onSuccess: () => {
            // Invalidate and refetch
            queryClient.invalidateQueries('volunteers')
        },
    })

    const {state: name, handler: handleNameChange} = useStateSetupHandler('');
    const {state: username, handler: handleUsernameChange} = useStateSetupHandler('');
    const {state: email, handler: handleEmailChange} = useStateSetupHandler('');
    const {state: password, handler: handlePasswordChange} = useStateSetupHandler('');

    const [phone, setPhone] = React.useState("");
    const handlePhoneChange = (value: any) => {setPhone(value)}
 
    const [date, setDate] = React.useState<dayjs.Dayjs | null>(null);
    
    const handleCreate = () => {
        mutation.mutate({
            name: name,
            username: username,
            password: password,
            email: email,
            phoneNumber: phone,
            date: dayjs(date).toDate()
        })
        props.handleClose()
    }
    
    const handleCancel = () => {
        props.handleClose()
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
                    stateSetter: handleEmailChange,
                    valid: isValidEmail(email)
                },
                {
                    label: "Username",
                    stateValue: username,
                    stateSetter: handleUsernameChange
                },
                {
                    label: "Password",
                    stateValue: password,
                    stateSetter: handlePasswordChange
                },
                {
                    label: "Phone Number",
                    type: 'phone',
                    stateValue: phone,
                    stateSetter: handlePhoneChange,
                    valid: isValidPhone(phone)
                },
                {
                    label: "Start Date",
                    type: 'date',
                    stateValue: date,
                    stateSetter: (d: any) => setDate(d),
                    valid: dayjs(date).isValid()
                },
            ]}
        />
    )
}
