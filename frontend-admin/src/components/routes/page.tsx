import React, {useState} from 'react'
import {
    useQuery,
} from '@tanstack/react-query'
import {getRouteDeliveries} from 'src/api/route-deliveries'
import {BasePage} from 'src/components/common/base-page'
import {ActionBar} from 'src/components/common/page-actionbar'
import {ViewBoard} from './board/view'
import {TransferBoard} from './board/transfer'
import {Box} from '@mui/material'

const RoutesPage = () => {
    const { isLoading, isError, data, error } = useQuery(['routeDeliveries'], () => getRouteDeliveries())
    
    const [mode, setMode] = useState("view")

    const Header = () => {
        return (
            <Box sx={{display: 'flex', width: '100%'}}>
                <Box sx={{display: 'flex', width: '100%'}}>Mode: {mode}</Box>
                <ActionBar actions={[{
                    handler: () => mode == "view" ? setMode("transfer") : setMode("view"),
                    label: "Edit"
                }]}/>
            </Box>
        )
    }

    return (
        <BasePage header={<Header/>}>
            <Box sx={{display: 'flex', flexDirection: 'column', width: '100%', height: '85%'}}> 
                {!isLoading && <>
                    {mode == "view" ?
                        <ViewBoard groupedRoutes={data ? data.data.routes : []}/>
                    :
                        <TransferBoard/>
                    }
                </>}
            </Box>
        </BasePage>
    )
}

export default RoutesPage;