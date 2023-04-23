import * as React from 'react';
import {ListItem, ListItemButton, ListItemText} from '@mui/material';

export const DrawerItem = (props: {label: string, onClickHandler: any}) => {
    return (
        <ListItem disablePadding>
            <ListItemButton onClick={props.onClickHandler}>
                <ListItemText primary={props.label} />
            </ListItemButton>
        </ListItem>
    )
}
