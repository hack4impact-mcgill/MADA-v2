import React, {useState} from 'react'
import NewTaskModalContents from './new-task'
import {routeColumns} from './columns'
import GridPage from 'src/components/common/grid/page'
import {
    useQuery,
} from '@tanstack/react-query'
import {getRouteDeliveries} from 'src/api/routeDeliveries'

const RoutesPage = () => {
    const { isLoading, isError, data, error } = useQuery(['routeDeliveries'], () => getRouteDeliveries())
    
    const gridCondition = isLoading

    const gridProps = {
        rows: data ? data!.data.routes : [],
        columns: routeColumns,
        filter: [],
        initalState: {},
        gridCondition: gridCondition,
    }

    const gridPageProps = {
        actionBarProps: [],
        modalControls: [],
        gridProps: gridProps
    }

    return (
        <GridPage {...gridPageProps}/>
    )
}

export default RoutesPage;