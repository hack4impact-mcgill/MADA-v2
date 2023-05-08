import React, {useState} from 'react'
import {routeColumns} from './columns'
import {
    useQuery,
} from '@tanstack/react-query'
import {getRouteDeliveries} from 'src/api/routeDeliveries'
import {BasePage} from 'src/components/common/base-page'
import {Box, Button} from '@mui/material'
import {DataGrid} from '@mui/x-data-grid'

const RoutesPage = () => {
    const { isLoading, isError, data, error } = useQuery(['routeDeliveries'], () => getRouteDeliveries())
    return (
        <BasePage header={<Box>Routes</Box>}>
            <Box sx={{display: 'flex', flexDirection: 'column', width: '100%', height: '85%'}}>
                <DataGrid
                    rows={data?.data.routes ? data!.data.routes : []}
                    columns={routeColumns}
                />
            </Box>
        </BasePage>
    )
}

export default RoutesPage;