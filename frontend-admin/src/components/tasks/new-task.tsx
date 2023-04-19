import React from 'react'
import {
    useQuery,
    useQueryClient,
    useMutation
} from '@tanstack/react-query'
import dayjs, { Dayjs } from 'dayjs';
import {createTask} from 'src/api/tasks';
import {getClients} from 'src/api/clients';
import {getVolunteers} from 'src/api/volunteers';
import BaseModal from 'src/components/common/modal/modal'
import {SelectOptionProps} from 'src/components/common/modal/inputs/type'

const NewTaskModalContents = (props: {handleClose: any}) => {
    const queryClient = useQueryClient()

    const mutation = useMutation(createTask, {
        onSuccess: () => {
            // Invalidate and refetch
            queryClient.invalidateQueries('tasks')
        },
    })
    const { isLoading: isLoadingVolunteer, data: volunteerData } = useQuery(['volunteers'], () => getVolunteers())
    const { isLoading: isLoadingClient, data: clientData } = useQuery(['clients'], () => getClients())

    const [date, setDate] = React.useState<Dayjs | null>(null);
    const [volunteerId, setVolunteerId] = React.useState<number>(-1);
    const [clientIds, setClientIds] = React.useState([]);

    const handleCreate = () => {
        mutation.mutate({})
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
                    options: volunteerData ? volunteerData!.data.volunteers.map((volunteer: any) => ({value: volunteer.id, label: volunteer.name} as SelectOptionProps)) : [],
                    stateValue: volunteerId,
                    stateSetter: (event: any) => setVolunteerId(event.target.value)
                },
                {
                    label: "Clients",
                    type: 'multiselect',
                    options: clientData ? clientData!.data.clients.map((client: any) => ({value: client.id, label: client.name} as SelectOptionProps)) : [],
                    stateValue: clientIds,
                    stateSetter: (event: any) => setClientIds(event.target.value)
                },
            ]}
        />
    )
}

export default NewTaskModalContents;