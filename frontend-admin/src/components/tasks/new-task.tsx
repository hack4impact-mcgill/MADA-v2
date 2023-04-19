import React from 'react'
import {
    useQuery,
    useQueryClient,
} from '@tanstack/react-query'
import dayjs, { Dayjs } from 'dayjs';
import {getVolunteers} from 'src/api/volunteers'
import {getClients} from 'src/api/clients'
import BaseModal from 'src/components/common/modal/modal'

const NewTaskModalContents = (props: {handleClose: any}) => {
    const queryClient = useQueryClient()

    // const mutation = useMutation(createVolunteer, {
    //     onSuccess: () => {
    //         // Invalidate and refetch
    //         queryClient.invalidateQueries('volunteers')
    //     },
    // })
    const { isLoading: isLoadingVolunteer, data: volunteerData } = useQuery(['volunteers'], () => getVolunteers())
    const { isLoading: isLoadingClient, data: clientData } = useQuery(['clients'], () => getClients())

    const [date, setDate] = React.useState<Dayjs | null>(null);

    const handleCreate = () => {
        // mutation.mutate({
        //     name: name,
        //     username: username,
        //     password: 'test',
        //     email: email,
        //     phoneNumber: 21334
        // })
        props.handleClose()
    }
    
    const handleCancel = () => {
        console.log("cancel")
    }

    return (
        <BaseModal
            title={"Create new task"}
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
                    label: "Delivery Date",
                    type: 'date',
                    stateValue: date,
                    stateSetter: (d: any) => setDate(d)
                },
                {
                    label: "Volunteer",
                    type: 'select',
                    options: volunteerData ? volunteerData!.data.volunteers.map((volunteer: any) => volunteer.name) : [],
                    stateValue: "",
                    stateSetter: (event: any) => console.log("selected ", event.target.value)
                },
                {
                    label: "Clients",
                    type: 'multiselect',
                    options: clientData ? clientData!.data.clients.map((client: any) => client.name) : [],
                    stateValue: [],
                    stateSetter: (event: any) => console.log("selected ", event.target.value)
                },
            ]}
        />
    )
}

export default NewTaskModalContents;