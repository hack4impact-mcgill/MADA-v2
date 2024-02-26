import { useSortable } from "@dnd-kit/sortable";
import {RouteDelivery} from './types';
import { CSS } from "@dnd-kit/utilities";

export default function Card(props: {data: RouteDelivery}) {
    const { attributes, listeners, setNodeRef, transform } = useSortable({
        id: props.data.id,
        // disabled: true // how to disable
    });

    const style = {
        transform: CSS.Transform.toString(transform)
    };
    return <div ref={setNodeRef} {...attributes} {...listeners} style={style}>
        <p>{props.data.id}</p>
    </div>;
}
