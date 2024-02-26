import React, {useState} from "react";
import Column from './column';
import {
    closestCorners,
    DndContext,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    DragEndEvent,
    DragOverEvent,
    Active,
    Over,
    DragStartEvent,
    UniqueIdentifier,
    DragCancelEvent,
    DragOverlay
} from "@dnd-kit/core";
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import { RouteDelivery, ResponseData } from "./types";

export const response_data: ResponseData = {
	"0": [
		{
			"id": 851060,
			"routeNumber": 0,
			"routePosition": 0,
			"mealType": "No Meat",
			"program": "STS"
		},
		{
			"id": 742492,
			"routeNumber": 0,
			"routePosition": 0,
			"mealType": "Vegetarian",
			"program": "MAP"
		},
		{
			"id": 327428,
			"routeNumber": 0,
			"routePosition": 0,
			"mealType": "Vegetarian",
			"program": "STS"
		},
		{
			"id": 444406,
			"routeNumber": 0,
			"routePosition": 0,
			"mealType": "Regular",
			"program": "STS"
		},
		{
			"id": 943595,
			"routeNumber": 0,
			"routePosition": 0,
			"mealType": "No Fish",
			"program": "MAP"
		},
		{
			"id": 115110,
			"routeNumber": 0,
			"routePosition": 0,
			"mealType": "No Meat",
			"program": "STS"
		},
		{
			"id": 658877,
			"routeNumber": 0,
			"routePosition": 0,
			"mealType": "No Meat",
			"program": "MAP"
		},
		{
			"id": 510872,
			"routeNumber": 0,
			"routePosition": 0,
			"mealType": "Vegetarian",
			"program": "STS"
		},
		{
			"id": 557078,
			"routeNumber": 0,
			"routePosition": 0,
			"mealType": "Regular",
			"program": "STS"
		},
		{
			"id": 868287,
			"routeNumber": 0,
			"routePosition": 0,
			"mealType": "No Fish",
			"program": "MAP"
		}
	],
	"1": [
		{
			"id": 111064,
			"routeNumber": 0,
			"routePosition": 0,
			"mealType": "Vegetarian",
			"program": "STS"
		},
		{
			"id": 265140,
			"routeNumber": 0,
			"routePosition": 0,
			"mealType": "Vegetarian",
			"program": "STS"
		},
		{
			"id": 664684,
			"routeNumber": 0,
			"routePosition": 0,
			"mealType": "No Meat",
			"program": "MAP"
		},
		{
			"id": 817055,
			"routeNumber": 0,
			"routePosition": 0,
			"mealType": "Regular",
			"program": "MAP"
		},
		{
			"id": 654993,
			"routeNumber": 0,
			"routePosition": 0,
			"mealType": "No Meat",
			"program": "STS"
		},
		{
			"id": 565347,
			"routeNumber": 0,
			"routePosition": 0,
			"mealType": "No Fish",
			"program": "STS"
		},
		{
			"id": 525509,
			"routeNumber": 0,
			"routePosition": 0,
			"mealType": "No Meat",
			"program": "MAP"
		},
		{
			"id": 724160,
			"routeNumber": 0,
			"routePosition": 0,
			"mealType": "No Fish",
			"program": "STS"
		},
		{
			"id": 238324,
			"routeNumber": 0,
			"routePosition": 0,
			"mealType": "No Fish",
			"program": "MAP"
		},
		{
			"id": 613813,
			"routeNumber": 0,
			"routePosition": 0,
			"mealType": "Regular",
			"program": "STS"
		}  
	]
}

export default function Board(props: {data: any}) {
    const [columns, setColumns] = useState(props.data as ResponseData);
    const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);
    const [clonedItems, setClonedItems] = useState<ResponseData | null>(null);

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
          coordinateGetter: sortableKeyboardCoordinates
        })
    )

    const findColumnIdFromActive = (item: Active): string => {
        if (!item.data.current) return "";
        return item.data.current.sortable.containerId
    }

    const findColumnIdFromOver = (item: Over): string => {
        if (!item.data.current) return "";
        return item.data.current.sortable.containerId
    }

    const handleDragStart = (event: DragStartEvent) => {
        const { active } = event;
        setActiveId(active.id);
        setClonedItems(columns);
    }

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        const activeId = active.id;
        const overId = over ? over.id : null;
        const activeColumnId = findColumnIdFromActive(active);
        const overColumnId = over ? findColumnIdFromOver(over) : "";
        
        if (!activeColumnId || !overColumnId || activeColumnId !== overColumnId) {
            return null;
        }
        
        const activeIndex = columns[activeColumnId].findIndex((i) => i.id === activeId);
        const overIndex = columns[overColumnId].findIndex((i) => i.id === overId);
        
        if (activeIndex !== overIndex) {
            setColumns((prevState) => {
                const d:ResponseData = {}
                Object.entries(prevState).map(([column, data]) => {
                    if (column === activeColumnId) {
                        data = arrayMove(columns[overColumnId], activeIndex, overIndex);
                        d[column] = data
                    } else {
                        d[column] = data
                    }
                })

                return d
            });
        }
    };

    const handleDragOver = (event: DragOverEvent) => {
        const { active, over, delta } = event;
        const activeId = active.id;
        const overId = over ? over.id : null;
        const activeColumnId = findColumnIdFromActive(active);
        const overColumnId = over ? findColumnIdFromOver(over) : null;
        
        if (!activeColumnId || !overColumnId || activeColumnId === overColumnId) {
            return null;
        }
        
        setColumns((prevState) => {
            const activeItems = columns[activeColumnId];
            const overItems = columns[overColumnId];
            const activeIndex = activeItems.findIndex((i) => i.id === activeId);
            const overIndex = overItems.findIndex((i) => i.id === overId);

            const newIndex = () => {
                const putOnBelowLastItem =
                    overIndex === overItems.length - 1 && delta.y > 0;
                const modifier = putOnBelowLastItem ? 1 : 0;
                return overIndex >= 0 ? overIndex + modifier : overItems.length + 1;
            };

            const d: ResponseData = {}

            Object.entries(prevState).map(([column, data]) => {
                if (column === activeColumnId) {
                    data = activeItems.filter((i) => i.id !== activeId);
                    d[column] = data
                } else if (column === overColumnId) {
                    data = [...overItems.slice(0, newIndex()),
                        activeItems[activeIndex],
                        ...overItems.slice(newIndex(), overItems.length),
                    ];
                    d[column] = data
                } else {
                    d[column] = data
                }
            })

            return d
        });
    }
    
    const handleDragCancelled = (event: DragCancelEvent) => {
        if (clonedItems) {
            // Reset items to their original state in case items have been
            // Dragged across containers
            setColumns(clonedItems);
        }
        
        setActiveId(null);
        setClonedItems(null);
    };

    return (<div>
        <DndContext
            sensors={sensors}
            collisionDetection={closestCorners}
            onDragEnd={handleDragEnd}
            onDragOver={handleDragOver}
            onDragCancel={handleDragCancelled}
            onDragStart={handleDragStart}
        >
            <div style={{display: "flex"}}>
                {
                    Object.entries(columns).map(([column, data]) => (
                        <Column key={column} column={column} data={data} />
                    ))
                }
            </div>
            <DragOverlay>
                {
                    // how to set overlay
                    activeId ? <div>OVERLAY {activeId}</div>: null
                }
            </DragOverlay>
        </DndContext>
    </div>);
}
