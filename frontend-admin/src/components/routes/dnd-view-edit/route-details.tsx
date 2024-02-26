import { RouteDelivery } from "./types";
import { SortableContext, rectSortingStrategy } from "@dnd-kit/sortable";
import { useDroppable } from "@dnd-kit/core";
import SortableStopDetails from './stop-details';
import {Box, Paper, Stack, Divider} from '@mui/material';

type SortableRouteDetailsProps = {
	column: string;
    data: RouteDelivery[];
    editEnabled: boolean;
};

export default function SortableRouteDetails({column, data, editEnabled}: SortableRouteDetailsProps) {
    const { setNodeRef } = useDroppable({ id: column });

    return (
        <SortableContext id={column} items={data} strategy={rectSortingStrategy}>
            <RouteDetails {...{column: column , data: data, editEnabled: editEnabled, setNodeRef: setNodeRef}}/>
        </SortableContext>
    );
}

type RouteDetailsProps = {
	column: string;
    data: RouteDelivery[];
    editEnabled: boolean;
    setNodeRef: any;
};

function RouteDetails({ column, data, editEnabled, setNodeRef }: RouteDetailsProps) {
	return (
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
                    Route: {column}
                </Box>
                
                <Divider sx={{borderColor: '#e9e9e9'}}/>

                <Stack spacing={2} sx={{height: '100%', overflow: 'auto', p: 2, backgroundColor: "#f6f6f6"}}>
                    {
                        data.map((d: RouteDelivery) => <SortableStopDetails key={d.id} data={d} editEnabled={editEnabled}/>)
                    }
                </Stack>
        </Paper>
	);
}