import React, {useState} from 'react'
import BaseModal from 'src/components/common/modal/modal'
import {useStateSetupHandler} from 'src/components/common/use-state-setup-handler';
import {isValidEmail, isValidPhone} from 'src/components/common/validators';
import {
    useMutation,
    useQueryClient,
} from '@tanstack/react-query'
import {createClient} from 'src/api/clients'

export const CreateModal = (props: {handleClose: any}) => {
    const queryClient = useQueryClient()

    const mutation = useMutation(createClient, {
        onSuccess: () => {
            // Invalidate and refetch
            queryClient.invalidateQueries('clients')
        },
    })
    
    const {state: name, handler: handleNameChange} = useStateSetupHandler('');
    const {state: address, handler: handleAddressChange} = useStateSetupHandler('');
    const {state: email, handler: handleEmailChange} = useStateSetupHandler('');
    const {state: sts, handler: handleSTSChange} = useStateSetupHandler(false);
    const {state: map, handler: handleMAPChange} = useStateSetupHandler(false);
    const [mealType, setMealType] = React.useState("");

    const [phone, setPhone] = React.useState("");
    const handlePhoneChange = (value: any) => {setPhone(value)}

    const handleCreate = async () => {
        mutation.mutate({
            name: name,
            address: address,
            email: email,
            phoneNumber: phone,
            sts: sts,
            map: map,
            mealType: mealType
        })
        props.handleClose()
    }
    
    const handleCancel = () => {
        props.handleClose()
    }

    return (
        <BaseModal
            title={"Create new client"}
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
                    label: "Phone Number",
                    type: 'phone',
                    stateValue: phone,
                    stateSetter: handlePhoneChange,
                    valid: isValidPhone(phone)
                },
                {
                    label: "Address",
                    stateValue: address,
                    stateSetter: handleAddressChange
                },
                {
                    label: "Meal Type",
                    type: 'select',
                    options: [{value: 'vegetarian', label: 'Vegetarian'}, {value: 'nomeat', label: 'No Meat'}, {value: 'nofish', label: 'No Fish'}],
                    stateValue: mealType,
                    stateSetter: (event: any) => setMealType(event.target.value),
                    valid: true
                },
                {
                    label: "STS",
                    stateValue: sts,
                    stateSetter: handleSTSChange,
                    type: 'boolean',
                    valid: true
                },
                {
                    label: "MAP",
                    stateValue: map,
                    stateSetter: handleMAPChange,
                    type: 'boolean',
                    valid: true
                },
            ]}
        />
    )
}