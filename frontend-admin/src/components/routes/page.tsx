import React, {useEffect, useState} from 'react'
import {
    useQuery,
} from '@tanstack/react-query'
import {getRouteDeliveries} from 'src/api/route-deliveries'
import {BasePage} from 'src/components/common/base-page'
import {ActionBar} from 'src/components/common/page-actionbar'
import {ViewBoard} from './board/view'
import {TransferBoard} from './board/transfer'
import {Box} from '@mui/material'
import Board from './dnd-view-edit/board';
import { ResponseData } from './dnd-view-edit/types'

/*
NOTES:
    routes/board: annoying click to transfer
    dnd: bad implementation of dnd-kit?
    dnd-view-edit: good implementation of dnd-kit
*/

const RoutesPage = () => {
    const { isLoading, isError, data, error } = useQuery(['routeDeliveries'], () => getRouteDeliveries())
    const [editEnabled, setEditEnabled] = useState(false)

    const Header = () => {
        return (
            <Box sx={{display: 'flex', width: '100%'}}>
                <Box sx={{display: 'flex', width: '100%'}}>Mode: {editEnabled.toString()}</Box>
                <ActionBar actions={[{
                    handler: () => editEnabled == false ? setEditEnabled(true) : setEditEnabled(false),
                    label: editEnabled == false ? "Edit" : "View"
                }]}/>
            </Box>
        )
    }

    return (
        <BasePage header={<Header/>}>
            <Box sx={{display: 'flex', flexDirection: 'column', width: '100%', height: '85%'}}> 
                {!isLoading && <>
                    <Board data={data?.data.routes} editEnabled={editEnabled}/>
                </>}
            </Box>
        </BasePage>
    )
}

export default RoutesPage;