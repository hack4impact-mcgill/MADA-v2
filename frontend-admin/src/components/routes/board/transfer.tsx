
import React, {useState} from 'react'
import {BoardList} from './list'
import {Grid, Box, Button, FormControl, Select, InputLabel, MenuItem} from '@mui/material'
import {
    useQuery,
    useMutation,
    QueryClient
} from '@tanstack/react-query'
import {EditRouteButtons} from './transfer/route-buttons'
import {TransferButtons} from './transfer/transfer-buttons'
import {setRouteDeliveryNumber} from 'src/api/route-deliveries'

type routeDelivery = {
    id: number
    routeNumber: number
    routePosition: number
    program: string
    mealType: string
}

export const TransferBoard = (props: {groupedRoutes: any}) => {
    const [routeNumber, setRouteNumber] = useState(-1)
    const [transferRoutes, setTransferRoutes] = useState([])
    const [selectedRouteDelivery, setSelectedRouteDelivery] = useState<routeDelivery | null>(null)
    const [disabledTransferLeft, setDisabledTransferLeft] = useState(true)
    const [disabledTransferRight, setDisabledTransferRight] = useState(true)
    const [routeNumberList, setRouteNumberList] = useState(Object.keys(props.groupedRoutes))
    
    const queryClient = new QueryClient()

    const setRouteNumberMutation = useMutation({
        mutationFn: () => setRouteDeliveryNumber(selectedRouteDelivery?.id, routeNumber),
        onSuccess: () => {
            queryClient.invalidateQueries('routeDeliveries')
        },
    });

    const handleChangeRouteNumber = (event: any) => {
        setRouteNumber(event.target.value)
        if (event.target.value in Object.keys(props.groupedRoutes)) {
            setTransferRoutes(props.groupedRoutes[event.target.value])
        } else {
            setTransferRoutes([])
        }
    }

    // Button handlers for TransferButtons
    const handleTransferLeft = async () => {
        await setRouteNumberMutation.mutate()
    }

    const handleTransferRight = async () => {
        await setRouteNumberMutation.mutate()
    }
    
    // Button handlers for EditRouteButtons
    const handleCreateRoute = () => {
        if (routeNumberList.length == 1 ||
            // new route number is not in the system yet, but the previous one is
            !(routeNumberList.length in Object.keys(props.groupedRoutes)) &&
            routeNumberList.length - 1 in Object.keys(props.groupedRoutes)
        ){
            setRouteNumberList([...routeNumberList, (routeNumberList.length).toString()])
        }
    }

    const handleDeleteRoute = () => {
        // check that theres nothign under route
        console.log("delete route")
    }

    const disabledDeleteRoute = true

    const handleSelectRouteDelivery = (route: any) => {
        setSelectedRouteDelivery(route)
        if (route === null) {
            setDisabledTransferRight(true)
            setDisabledTransferLeft(true)
        } else if (route.routeNumber == 0) {
            setDisabledTransferLeft(true)
            setDisabledTransferRight(false)
        } else if (route.routeNumber != 0) {
            setDisabledTransferRight(true)
            setDisabledTransferLeft(false)
        }
    }

    return (
        <Box sx={{display: 'flex', overflow: 'auto'}}>
            <BoardList header={""} routes={props.groupedRoutes[0]} selectable={{
                selectedRouteDelivery: selectedRouteDelivery,
                setSelectedRouteDelivery: handleSelectRouteDelivery
            }}/>
            <TransferButtons
                handleTransferRight={handleTransferRight}
                disabledTransferRight={disabledTransferRight}
                handleTransferLeft={handleTransferLeft}
                disabledTransferLeft={disabledTransferLeft}
            />
            <Box
                sx={{display: 'flex', flexDirection: 'column'}}
            >
                <FormControl size="small">
                    <Select
                        value={routeNumber}
                        onChange={handleChangeRouteNumber}
                    >
                        {routeNumberList.filter(obj => obj !== "0").map((routeNumber: string) => ([
                            <MenuItem key={routeNumber} value={routeNumber}>
                                {routeNumber}
                            </MenuItem>
                        ]))}
                    </Select>
                </FormControl>
                <BoardList header={""} routes={transferRoutes}/>
            </Box>
            <EditRouteButtons
                handleCreateRoute={handleCreateRoute}
                handleDeleteRoute={handleDeleteRoute}
                disabledDeleteRoute={disabledDeleteRoute}
            />
        </Box>
    )
}