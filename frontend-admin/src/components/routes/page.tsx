import React, {useEffect, useState} from 'react'
import {
    useQuery,
} from '@tanstack/react-query'
import {getRouteDeliveries} from 'src/api/route-deliveries'
import {BasePage} from 'src/components/common/base-page'
import {ActionBar} from 'src/components/common/page-actionbar'
import {Box} from '@mui/material'
import Board from './editor/board';
import { ResponseData } from './editor/types'

export enum BoardAction {
    VIEW = "view",
    EDIT = "edit",
    CANCEL = "cancel",
    SAVE = "save",
}

const RoutesPage = () => {
    const { isLoading, isError, data, error, refetch } = useQuery(['routeDeliveries'], () => getRouteDeliveries())
    const [boardAction, setBoardAction] = useState(BoardAction.VIEW)

    const handleEnableEdit = () => {
        setBoardAction(BoardAction.EDIT)
    }

    const handleCancelEdit = () => {
        setBoardAction(BoardAction.CANCEL)
    }

    const handleSaveEdit = () => {
        setBoardAction(BoardAction.SAVE)
    }

    const Header = () => {
        return (
            <Box sx={{display: 'flex', width: '100%'}}>
                <Box sx={{display: 'flex', width: '100%'}}>Mode: {boardAction.toString()}</Box>
                
                {boardAction == BoardAction.VIEW ? <>
                    <ActionBar actions={[{
                        handler: handleEnableEdit,
                        label: "Edit"
                    }]}/>
                </> : <>
                    <ActionBar actions={[{
                        handler: handleCancelEdit,
                        label: "Cancel"
                    },{
                        handler: handleSaveEdit,
                        label: "Save"
                    }]}/>
                </>}
            </Box>
        )
    }
 
    return (
        <BasePage header={<Header/>}>
            <Box sx={{display: 'flex', flexDirection: 'column', width: '100%', height: '85%'}}> 
                {!isLoading && <>
                    <Board boardAction={boardAction} setBoardAction={setBoardAction}/>
                </>}
            </Box>
        </BasePage>
    )
}

export default RoutesPage;