
import React, {useEffect, useState} from 'react'
import {BoardList} from './list'
import {Grid, Box, Button, FormControl, Select, InputLabel, MenuItem} from '@mui/material'
import {
    useQuery,
    useMutation,
    QueryClient
} from '@tanstack/react-query'
import {EditRouteButtons} from './transfer/route-buttons'
import {TransferButtons} from './transfer/transfer-buttons'
import {setRouteDeliveryNumber, getRouteDeliveries, increaseRouteDeliveryPosition, decreaseRouteDeliveryPosition} from 'src/api/route-deliveries'

type routeDelivery = {
    id: number
    routeNumber: number
    routePosition: number
    program: string
    mealType: string
}

export const TransferBoard = () => {
    const { isLoading, isError, data, error, refetch } = useQuery(['routeDeliveries'], () => getRouteDeliveries())

    // List of route numbers available to transfer to
    const [routeNumberList, setRouteNumberList] = useState<string[]>([])
    // Route Number to transfer routeDelivery items to
    const [routeNumber, setRouteNumber] = useState(-1)
    // RouteDelivery items on list 2
    const [transferRoutes, setTransferRoutes] = useState([])
    // Unassigned  items on list 2
    const [unassignedRoutes, setUnassignedRoutes] = useState([])
    // Selected RouteDelivery item
    const [selectedRouteDelivery, setSelectedRouteDelivery] = useState<routeDelivery | null>(null)
    const [disabledTransferLeft, setDisabledTransferLeft] = useState(true)
    const [disabledTransferRight, setDisabledTransferRight] = useState(true)
    const [disabledDecrementPosition, setDisabledDecrementPosition] = useState(true)
    const [disabledIncrementPosition, setDisabledIncrementPosition] = useState(true)
    
    const queryClient = new QueryClient()

    const [allSavedRoutes, setAllSavedRoutes] = useState([])

    useEffect(() => {
        if (!data) return;
        setAllSavedRoutes(data.data.routes)
        setUnassignedRoutes(data.data.routes[0])
        setRouteNumberList(Object.keys(data.data.routes))
        if (routeNumber) {
            setTransferRoutes(data.data.routes[routeNumber])
        }
    }, [data])

    const setRouteNumberMutation = useMutation({
        mutationFn: async (n: number) => await setRouteDeliveryNumber(selectedRouteDelivery!.id || 0, n),
        onSuccess: async () => {
            queryClient.invalidateQueries('routeDeliveries')
            await refetch()
        },
    });

    const incrementRoutePositionMutation = useMutation({
        mutationFn: async () => await increaseRouteDeliveryPosition(selectedRouteDelivery!.id || 0),
        onSuccess: async () => {
            queryClient.invalidateQueries('routeDeliveries')
            await refetch()
        },
    });

    const decrementRoutePositionMutation = useMutation({
        mutationFn: async () => await decreaseRouteDeliveryPosition(selectedRouteDelivery!.id || 0),
        onSuccess: async () => {
            queryClient.invalidateQueries('routeDeliveries')
            await refetch()
        },
    });

    const handleChangeRouteNumber = (event: any) => {
        setRouteNumber(event.target.value)
        if (event.target.value in Object.keys(allSavedRoutes)) {
            setTransferRoutes(allSavedRoutes[event.target.value])
        } else {
            setTransferRoutes([])
        }
    }

    // Button handlers for TransferButtons
    const handleTransferLeft = async () => {
        await setRouteNumberMutation.mutate(0)
        handleSelectRouteDelivery(null)
    }

    const handleTransferRight = async () => {
        await setRouteNumberMutation.mutate(routeNumber)
        handleSelectRouteDelivery(null)
    }

    const handleIncrementPosition = async () => {
        await incrementRoutePositionMutation.mutate()
        setSelectedRouteDelivery(null)
        
        setDisabledTransferRight(true)
        setDisabledTransferLeft(true)
    }

    const handleDecrementPosition = async () => {
        await decrementRoutePositionMutation.mutate()
        setSelectedRouteDelivery(null)
        
        setDisabledTransferRight(true)
        setDisabledTransferLeft(true)
    }
    
    // Button handlers for EditRouteButtons
    const handleCreateRoute = () => {
        if (routeNumberList.length == 1 ||
            // new route number is not in the system yet, but the previous one is
            !(routeNumberList.length in Object.keys(allSavedRoutes)) &&
            routeNumberList.length - 1 in Object.keys(allSavedRoutes)
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
        if (routeNumber === -1) { return }
        
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

            if (route.routePosition == 0){
                setDisabledDecrementPosition(true)
            } else if (route.routePosition == transferRoutes.length - 1) {
                setDisabledIncrementPosition(true)
            } else {
                setDisabledIncrementPosition(false)
                setDisabledDecrementPosition(false)
            }
        }
    }

    return (
        <Box sx={{display: 'flex', overflow: 'auto'}}>
            <BoardList header={""} routes={unassignedRoutes} selectable={{
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
                <BoardList header={""} routes={transferRoutes} selectable={{
                    selectedRouteDelivery: selectedRouteDelivery,
                    setSelectedRouteDelivery: handleSelectRouteDelivery
                }}/>
            </Box>
            <EditRouteButtons
                handleCreateRoute={handleCreateRoute}
                handleDeleteRoute={handleDeleteRoute}
                disabledDeleteRoute={disabledDeleteRoute}
                handleIncrementPosition={handleIncrementPosition}
                handleDecrementPosition={handleDecrementPosition}
                disabledDecrementPosition={disabledDecrementPosition}
                disabledIncrementPosition={disabledIncrementPosition}
            />
        </Box>
    )
}