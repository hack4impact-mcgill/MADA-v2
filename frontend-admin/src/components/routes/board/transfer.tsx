
import React, {useState} from 'react'
import {BoardList} from './list'
import {Grid, Box, Button, FormControl, Select, InputLabel, MenuItem} from '@mui/material'

const TransferButtons = (props: {
    handleTransferRight?: any,
    disabledTransferRight?: boolean,
    handleTransferLeft?: any,
    disabledTransferLeft?: boolean
}) => {
    const {handleTransferRight, disabledTransferRight, handleTransferLeft, disabledTransferLeft} = props

    return (
        <Box sx={{display: 'flex', flexDirection: 'column', mx: 2}}>
            <Button
                variant="outlined"
                size="small"
                onClick={handleTransferRight}
                disabled={disabledTransferRight}
            >
                {">"}
            </Button>
            <Button
                variant="outlined"
                size="small"
                onClick={handleTransferLeft}
                disabled={disabledTransferLeft}
            >
                {"<"}
            </Button>
        </Box>
    )
}

const EditRouteButtons = (props: {
    handleCreateRoute: any,
    handleDeleteRoute: any,
    disabledDeleteRoute: boolean
}) => {
    const {handleCreateRoute, handleDeleteRoute, disabledDeleteRoute} = props
    return (
        <Box sx={{display: 'flex', flexDirection: 'column', mx: 2}}>
            <Button
                variant="outlined"
                onClick={handleCreateRoute}
                size="small"
            >
                Create new route
            </Button>
            <Button
                variant="outlined"
                onClick={handleDeleteRoute}
                disabled={disabledDeleteRoute}
                size="small"
            >
                Delete route
            </Button>
        </Box>
    )
}

export const TransferBoard = (props: {groupedRoutes: any}) => {
    const [routeNumber, setRouteNumber] = useState(-1)
    const [transferRoutes, setTransferRoutes] = useState([])
    const [selectedRouteDelivery, setSelectedRouteDelivery] = useState(null)
    const [disabledTransferLeft, setDisabledTransferLeft] = useState(true)
    const [disabledTransferRight, setDisabledTransferRight] = useState(true)
    const [routeNumberList, setRouteNumberList] = useState(Object.keys(props.groupedRoutes))

    const handleChangeRouteNumber = (event: any) => {
        setRouteNumber(event.target.value)
        if (event.target.value in Object.keys(props.groupedRoutes)) {
            console.log("its in here")
            setTransferRoutes(props.groupedRoutes[event.target.value])
            console.log("transfer routes", props.groupedRoutes[event.target.value])
        } else {
            setTransferRoutes([])
        }
    }

    // Button handlers for TransferButtons
    const handleTransferLeft = () => {
        console.log("transfer left")
    }

    const handleTransferRight = () => {
        console.log("transfer right")
    }
    
    // Button handlers for EditRouteButtons
    const handleCreateRoute = () => {
        // last route number is not in routeNumberList
        // || !(routeNumberList.length - 2 in Object.keys(props.groupedRoutes))
        if (routeNumberList.length == 1){
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