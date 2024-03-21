import { useSortable } from "@dnd-kit/sortable";
import {RouteDelivery} from './types';
import { CSS } from "@dnd-kit/utilities";
import {Typography, CardContent, Card} from '@mui/material';

type SortableStopDetailsProps = {
	data: RouteDelivery;
	editEnabled: boolean
};

export default function SortableStopDetails({data, editEnabled}: SortableStopDetailsProps) {
    const { attributes, listeners, setNodeRef, transform } = useSortable({
        id: data.id,
        disabled: !editEnabled
    });

    const style = {
        transform: CSS.Transform.toString(transform)
    };

    return <div ref={setNodeRef} {...attributes} {...listeners} style={style}>
        <StopDetails stop={data}/>
        {/* <StopDetails {...{
                id: data.id,
                mealType: data.mealType,
                program: data.program,
            }}
        /> */}
    </div>;
}

type StopDetailsProps = {
	id: string;
	mealType: string;
	program: string
};

export function StopDetails( props: {stop: RouteDelivery}) {
    const {stop} = props

	return (
        <Card variant="outlined">
            <CardContent>
                <Typography>{stop.client.name}</Typography>
                <Typography>{stop.mealType}</Typography>
                <Typography>{stop.program}</Typography>
                <Typography variant="caption">{stop.id.substring(0,4)}</Typography>
            </CardContent>
        </Card>
	);
}