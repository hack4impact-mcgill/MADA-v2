import React, {useEffect} from 'react'
import {EditVolunteerState, useEditVolunteerStore} from 'src/components/volunteers/volunteer.store';
import {getVolunteer, editVolunteer} from 'src/api/volunteers'
import {isAllValid, BaseModal} from 'src/components/common/modal/modal'
import {useStateSetupHandler} from 'src/components/common/use-state-setup-handler';
import {isValidEmail, isValidPhone} from 'src/components/common/validators';
import {ModalActionBar} from 'src/components/common/modal/actionbar';
import { ModalPhoneInput, ModalTextInput } from 'src/components/common/modal/inputs'

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
    const {state: email, setState: setEmail, handler: handleEmailChange} = useStateSetupHandler('');

    const [phone, setPhone] = React.useState("");
    const handlePhoneChange = (value: any) => {setPhone(value)}

    useEffect(() => {
        if (data) {
            setName(data!.data.volunteer.name);
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
    
    const valid = isAllValid([name, isValidEmail(email), isValidPhone(phone)])
    
    return (
        <BaseModal title={"Edit " + name}>
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

            <ModalPhoneInput {...{
                label: "Phone Number",
                stateValue: phone,
                stateSetter: handlePhoneChange,
            }}/>

            <ModalActionBar
                primaryActionProps={{
                    handlePrimary: handleSave,
                    labelPrimary: "Save",
                    disabled: !valid
                }}
                secondaryActionProps={[
                    {
                        handle: handleCancel,
                        label: "Cancel"
                    },
                ]}
            />
        </BaseModal>
    )
}