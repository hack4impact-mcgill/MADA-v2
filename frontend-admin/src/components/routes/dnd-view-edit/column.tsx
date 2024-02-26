import { RouteDelivery } from "./types";
import { SortableContext, rectSortingStrategy } from "@dnd-kit/sortable";
import { useDroppable } from "@dnd-kit/core";
import Card from './card';

export default function Column(props: {column: string, data: RouteDelivery[]}) {
    const { setNodeRef } = useDroppable({ id: props.column });

    return (
        <SortableContext id={props.column} items={props.data} strategy={rectSortingStrategy}>
            <div ref={setNodeRef} style={{width: "100px"}}>

                <div>column: {props.column}</div>
                {
                    props.data.map((d: RouteDelivery) => <Card key={d.id} data={d}></Card>)
                }
            </div>
        </SortableContext>
    );
}
