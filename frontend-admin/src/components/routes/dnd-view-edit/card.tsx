import { useSortable } from "@dnd-kit/sortable";
import {RouteDelivery} from './types';
import { CSS } from "@dnd-kit/utilities";
import {Box, Typography, CardContent, Card} from '@mui/material';

export default function SortableCard(props: {data: RouteDelivery, editEnabled: boolean}) {
    const { attributes, listeners, setNodeRef, transform } = useSortable({
        id: props.data.id,
        disabled: !props.editEnabled
    });

    const style = {
        transform: CSS.Transform.toString(transform)
    };

    return <div ref={setNodeRef} {...attributes} {...listeners} style={style}>
        <DesignCard {...{
                id: props.data.id,
                mealType: props.data.mealType,
                program: props.data.program,
            }}
        />
    </div>;
}

export type ItemType = {
	id: number;
	mealType: string;
	program: string
};

export function DesignCard({ id, mealType, program }: ItemType) {
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