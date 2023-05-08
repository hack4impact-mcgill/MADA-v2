import React from 'react'
import {
    useMutation,
    useQueryClient,
} from '@tanstack/react-query'
import {createVolunteer} from 'src/api/volunteers'
import * as dayjs from 'dayjs'
import {useStateSetupHandler} from 'src/components/common/use-state-setup-handler';
import {isValidEmail, isValidPhone} from 'src/components/common/validators';
import {isAllValid, BaseModal} from 'src/components/common/modal/modal';
import {ModalActionBar} from 'src/components/common/modal/actionbar';
import { ModalDateInput, ModalPhoneInput, ModalTextInput } from 'src/components/common/modal/inputs'

export const CreateModal = (props: {handleClose: any}) => {
    const queryClient = useQueryClient()

    const mutation = useMutation(createVolunteer, {
        onSuccess: () => {
            // Invalidate and refetch
            queryClient.invalidateQueries('volunteers')
        },
    })

    const {state: name, handler: handleNameChange} = useStateSetupHandler('');
    const {state: email, handler: handleEmailChange} = useStateSetupHandler('');
    const {state: password, handler: handlePasswordChange} = useStateSetupHandler('');

    const [phone, setPhone] = React.useState("");
    const handlePhoneChange = (value: any) => {setPhone(value)}
 
    const [date, setDate] = React.useState<dayjs.Dayjs | null>(null);
    
    const handleCreate = () => {
        mutation.mutate({
            name: name,
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

    const valid = isAllValid([name, isValidEmail(email), password, isValidPhone(phone), dayjs(date).isValid()])
    
    return (
        <BaseModal title={"Create volunteer"}>
            <ModalTextInput {...{
                label: "Name",
                stateValue: name,
                stateSetter: handleNameChange
            }}/>

            <ModalTextInput {...{
                label: "Email",
                stateValue: email,
                stateSetter: handleEmailChange
            }}/>

            <ModalTextInput {...{
                label: "Password",
                stateValue: password,
                stateSetter: handlePasswordChange
            }}/>

            <ModalPhoneInput {...{
                label: "Phone Number",
                stateValue: phone,
                stateSetter: handlePhoneChange,
            }}/>

            <ModalDateInput {...{
                label: "Date",
                stateValue: date,
                stateSetter: setDate,
            }}/>
            
            <ModalActionBar
                primaryActionProps={{
                    handlePrimary: handleCreate,
                    labelPrimary: "Create",
                    disabled: !valid
                }}
                secondaryActionProps={[
                    {
                        handle: handleCancel,
                        label: "Cancel"
                    }
                ]}
            />
        </BaseModal>
    )
}
