import React from 'react'
import {
    useQuery,
} from '@tanstack/react-query'
import {getVolunteers} from 'src/api/volunteers'

const VolunteerPage = () => {
    const { isLoading, isError, data, error } = useQuery(['volunteers'], () => getVolunteers())

    return (
        <>
            <div>volunteers page</div>
            {isLoading
                ? <div>loading...</div>
                : <div>loeaded</div>}
        </>
    )
}

export default VolunteerPage;