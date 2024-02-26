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
        <StopDetails {...{
                id: data.id,
                mealType: data.mealType,
                program: data.program,
            }}
        />
    </div>;
}

type StopDetailsProps = {
	id: number;
	mealType: string;
	program: string
};

function StopDetails({ id, mealType, program }: StopDetailsProps) {
	return (
        <Card variant="outlined">
            <CardContent>
                <Typography>{id}</Typography>
                <Typography>{mealType}</Typography>
                <Typography>{program}</Typography>
            </CardContent>
        </Card>
	);
}