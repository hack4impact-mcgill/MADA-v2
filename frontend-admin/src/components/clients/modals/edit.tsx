import React, {useEffect} from 'react'
import {EditClientState, useEditClientStore} from '../client.store';
import {getClient, editClient} from 'src/api/clients'
import BaseModal from 'src/components/common/modal/modal'
import {useStateSetupHandler} from 'src/components/common/use-state-setup-handler';
import {isValidEmail, isValidPhone} from 'src/components/common/validators';

import {
    useQuery,
    useMutation,
    QueryClient
} from '@tanstack/react-query'

export const EditModal = () => {
    const id = useEditClientStore((state: EditClientState) => state.id)
    const setId = useEditClientStore((state: EditClientState) => state.setId)

    const { data } = useQuery({
        queryKey: ['clients', id],
        queryFn: () => getClient(id)
    })

    const {state: name, setState: setName, handler: handleNameChange} = useStateSetupHandler('');
    const {state: address, setState: setAddress, handler: handleAddressChange} = useStateSetupHandler('');
    const {state: email, setState: setEmail, handler: handleEmailChange} = useStateSetupHandler('');

    const [phone, setPhone] = React.useState("");
    const handlePhoneChange = (value: any) => {setPhone(value)}

    useEffect(() => {
        if (data) {
            setName(data!.data.client.name);
            setPhone(data!.data.client.phoneNumber);
            setAddress(data!.data.client.address);
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
                email: email,
                phoneNumber: phone,
                address: address
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
            ]}
        />
    )
}
