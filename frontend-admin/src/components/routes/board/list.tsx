import {Grid, Box, Paper, List, ListItemButton, ListItemText} from '@mui/material'

const BoardListItem = (props: {route: any, selectable?: any}) => {
    const {id, client, program, mealType} = props.route
    
    const handleClick = () => {
        if (props.selectable?.selectedRouteDelivery === null || props.selectable?.selectedRouteDelivery.id !== id) {
            props.selectable?.setSelectedRouteDelivery(props.route)
        }
        else {
            props.selectable?.setSelectedRouteDelivery(null)
        }
    }

    const isSelected = props.selectable?.selectedRouteDelivery === null ? false : props.selectable?.selectedRouteDelivery?.id === id
    
    return (
        <ListItemButton
            selected={isSelected}
            onClick={handleClick}
        >
            <ListItemText id={id} primary={`${program}/${mealType} - ${client.name}`} secondary={client.address}/>
        </ListItemButton>
    )
}

export const BoardList = (props: {header: string, routes: any, selectable?: any}) => {
    const {header} = props
    return (
        <Paper sx={{ minWidth: 300, height: '100%', overflow: 'auto'}}>
            <Box sx={{mx: 2}}>{header}</Box>
            <List dense component="div" role="list">
                {props.routes && props.routes.map((route: any) =>
                    <BoardListItem key={route.id} route={route} selectable={props.selectable}/>
                )}
            </List>
        </Paper>
    )
}
