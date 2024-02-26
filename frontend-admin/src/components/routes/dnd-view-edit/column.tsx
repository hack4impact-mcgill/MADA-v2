import { RouteDelivery } from "./types";
import { SortableContext, rectSortingStrategy } from "@dnd-kit/sortable";
import { useDroppable } from "@dnd-kit/core";
import SortableCard from './card';
import {Box, Typography, Paper, Stack, Divider} from '@mui/material';

export default function Column(props: {column: string, data: RouteDelivery[], editEnabled: boolean}) {
    const { setNodeRef } = useDroppable({ id: props.column });

    return (
        <SortableContext id={props.column} items={props.data} strategy={rectSortingStrategy}>
            <Paper
                ref={setNodeRef}
                sx={{
                    display: 'flex',
                    maxHeight: '100%',
                    flexDirection:'column',
                    minWidth: '25%',
                    border: 1,
                    borderColor: '#e9e9e9'
                }}
            >
                <Box sx={{p: 2}}>
                    Route: {props.column}
                </Box>
                <Divider sx={{borderColor: '#e9e9e9'}}/>
                <Stack spacing={2} sx={{height: '100%', overflow: 'auto', p: 2, backgroundColor: "#f6f6f6"}}>
                    {
                        props.data.map((d: RouteDelivery) => <SortableCard key={d.id} data={d} editEnabled={props.editEnabled}></SortableCard>)
                    }
                </Stack>
            </Paper>
        </SortableContext>
    );
}
