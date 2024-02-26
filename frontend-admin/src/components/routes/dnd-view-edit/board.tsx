import React, {useEffect, useState} from "react";
import SortableRouteDetails from './route-details';
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
import {Box, Typography, Stack, Grid} from '@mui/material';
import {BoardAction} from '../page';
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {saveAllRouteDeliveries} from 'src/api/route-deliveries'
import {
    useQuery,
} from '@tanstack/react-query'
import {getRouteDeliveries} from 'src/api/route-deliveries'

// export const response_data: ResponseData = {
// 	"0": [
// 		{
// 			"id": 851060,
// 			"routeNumber": 0,
// 			"routePosition": 0,
// 			"mealType": "No Meat",
// 			"program": "STS"
// 		},
// 		{
// 			"id": 742492,
// 			"routeNumber": 0,
// 			"routePosition": 0,
// 			"mealType": "Vegetarian",
// 			"program": "MAP"
// 		},
// 		{
// 			"id": 327428,
// 			"routeNumber": 0,
// 			"routePosition": 0,
// 			"mealType": "Vegetarian",
// 			"program": "STS"
// 		},
// 		{
// 			"id": 444406,
// 			"routeNumber": 0,
// 			"routePosition": 0,
// 			"mealType": "Regular",
// 			"program": "STS"
// 		},
// 		{
// 			"id": 943595,
// 			"routeNumber": 0,
// 			"routePosition": 0,
// 			"mealType": "No Fish",
// 			"program": "MAP"
// 		},
// 		{
// 			"id": 115110,
// 			"routeNumber": 0,
// 			"routePosition": 0,
// 			"mealType": "No Meat",
// 			"program": "STS"
// 		},
// 		{
// 			"id": 658877,
// 			"routeNumber": 0,
// 			"routePosition": 0,
// 			"mealType": "No Meat",
// 			"program": "MAP"
// 		},
// 		{
// 			"id": 510872,
// 			"routeNumber": 0,
// 			"routePosition": 0,
// 			"mealType": "Vegetarian",
// 			"program": "STS"
// 		},
// 		{
// 			"id": 557078,
// 			"routeNumber": 0,
// 			"routePosition": 0,
// 			"mealType": "Regular",
// 			"program": "STS"
// 		},
// 		{
// 			"id": 868287,
// 			"routeNumber": 0,
// 			"routePosition": 0,
// 			"mealType": "No Fish",
// 			"program": "MAP"
// 		}
// 	],
// 	"1": [
// 		{
// 			"id": 111064,
// 			"routeNumber": 0,
// 			"routePosition": 0,
// 			"mealType": "Vegetarian",
// 			"program": "STS"
// 		},
// 		{
// 			"id": 265140,
// 			"routeNumber": 0,
// 			"routePosition": 0,
// 			"mealType": "Vegetarian",
// 			"program": "STS"
// 		},
// 		{
// 			"id": 664684,
// 			"routeNumber": 0,
// 			"routePosition": 0,
// 			"mealType": "No Meat",
// 			"program": "MAP"
// 		},
// 		{
// 			"id": 817055,
// 			"routeNumber": 0,
// 			"routePosition": 0,
// 			"mealType": "Regular",
// 			"program": "MAP"
// 		},
// 		{
// 			"id": 654993,
// 			"routeNumber": 0,
// 			"routePosition": 0,
// 			"mealType": "No Meat",
// 			"program": "STS"
// 		},
// 		{
// 			"id": 565347,
// 			"routeNumber": 0,
// 			"routePosition": 0,
// 			"mealType": "No Fish",
// 			"program": "STS"
// 		},
// 		{
// 			"id": 525509,
// 			"routeNumber": 0,
// 			"routePosition": 0,
// 			"mealType": "No Meat",
// 			"program": "MAP"
// 		},
// 		{
// 			"id": 724160,
// 			"routeNumber": 0,
// 			"routePosition": 0,
// 			"mealType": "No Fish",
// 			"program": "STS"
// 		},
// 		{
// 			"id": 238324,
// 			"routeNumber": 0,
// 			"routePosition": 0,
// 			"mealType": "No Fish",
// 			"program": "MAP"
// 		},
// 		{
// 			"id": 613813,
// 			"routeNumber": 0,
// 			"routePosition": 0,
// 			"mealType": "Regular",
// 			"program": "STS"
// 		}  
// 	],
// 	"2": [
// 			{
// 			"id": 440557,
// 			"routeNumber": 0,
// 			"routePosition": 0,
// 			"mealType": "No Fish",
// 			"program": "STS"
// 			},
// 			{
// 			"id": 634464,
// 			"routeNumber": 0,
// 			"routePosition": 0,
// 			"mealType": "Regular",
// 			"program": "STS"
// 			},
// 			{
// 			"id": 740684,
// 			"routeNumber": 0,
// 			"routePosition": 0,
// 			"mealType": "Vegetarian",
// 			"program": "MAP"
// 			},
// 			{
// 			"id": 757312,
// 			"routeNumber": 0,
// 			"routePosition": 0,
// 			"mealType": "Vegetarian",
// 			"program": "STS"
// 			},
// 			{
// 			"id": 954959,
// 			"routeNumber": 0,
// 			"routePosition": 0,
// 			"mealType": "Regular",
// 			"program": "MAP"
// 		}
// 	],
// 	"3": [
// 		{
// 		  "id": 124694,
// 		  "routeNumber": 0,
// 		  "routePosition": 0,
// 		  "mealType": "No Fish",
// 		  "program": "STS"
// 		},
// 		{
// 		  "id": 621723,
// 		  "routeNumber": 0,
// 		  "routePosition": 0,
// 		  "mealType": "Regular",
// 		  "program": "MAP"
// 		},
// 		{
// 		  "id": 422920,
// 		  "routeNumber": 0,
// 		  "routePosition": 0,
// 		  "mealType": "No Meat",
// 		  "program": "STS"
// 		},
// 		{
// 		  "id": 334091,
// 		  "routeNumber": 0,
// 		  "routePosition": 0,
// 		  "mealType": "No Fish",
// 		  "program": "STS"
// 		},
// 		{
// 		  "id": 681240,
// 		  "routeNumber": 0,
// 		  "routePosition": 0,
// 		  "mealType": "No Fish",
// 		  "program": "STS"
// 		}
// 	  ],
// 	"4": [
// 		{
// 		  "id": 744614,
// 		  "routeNumber": 0,
// 		  "routePosition": 0,
// 		  "mealType": "Regular",
// 		  "program": "STS"
// 		},
// 		{
// 		  "id": 846544,
// 		  "routeNumber": 0,
// 		  "routePosition": 0,
// 		  "mealType": "No Fish",
// 		  "program": "MAP"
// 		},
// 		{
// 		  "id": 727924,
// 		  "routeNumber": 0,
// 		  "routePosition": 0,
// 		  "mealType": "No Meat",
// 		  "program": "STS"
// 		},
// 		{
// 		  "id": 984339,
// 		  "routeNumber": 0,
// 		  "routePosition": 0,
// 		  "mealType": "No Fish",
// 		  "program": "STS"
// 		},
// 		{
// 		  "id": 293449,
// 		  "routeNumber": 0,
// 		  "routePosition": 0,
// 		  "mealType": "No Fish",
// 		  "program": "MAP"
// 		}
// 	  ]
// }

type BoardProps = {
    boardAction: BoardAction;
    setBoardAction: any;
};

export default function Board({boardAction, setBoardAction}: BoardProps) {
    const { isLoading, isError, data, error, refetch, isStale } = useQuery(['routeDeliveries'], () => getRouteDeliveries())

    const [viewRoutes, setViewRoutes] = useState<ResponseData | null>(null);
    const [editRoutes, setEditRoutes] = useState<ResponseData | null>(null);
    
    const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);
    const [clonedItems, setClonedItems] = useState<ResponseData | null>(null);

    const queryClient = useQueryClient();
    
    const saveAllRouteDeliveriesMutation = useMutation({
        mutationFn: async (data: any) => await saveAllRouteDeliveries(data),
        onSuccess: () => {
            queryClient.invalidateQueries(['routeDeliveries'])
            refetch()
            const d = data
        },
    });

    useEffect(() => {
        if (boardAction == BoardAction.VIEW) {
            setViewRoutes(data?.data.routes)
            setEditRoutes(null)
        } else if (boardAction == BoardAction.EDIT) {
            setEditRoutes(data?.data.routes)
        } else if (boardAction == BoardAction.CANCEL) {
            setViewRoutes(data?.data.routes)
            setEditRoutes(null)
            setBoardAction(BoardAction.VIEW)
        } else if (boardAction == BoardAction.SAVE) {
            saveAllRouteDeliveriesMutation.mutate(editRoutes)
            setBoardAction(BoardAction.VIEW)
        }
    }, [boardAction, data])

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
        setClonedItems(editRoutes);
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
        
        const activeIndex = editRoutes![activeColumnId].findIndex((i) => i.id === activeId);
        const overIndex = editRoutes![overColumnId].findIndex((i) => i.id === overId);
        
        if (activeIndex !== overIndex) {
            setEditRoutes((prevState) => {
                const d:ResponseData = {}
                Object.entries(prevState!).map(([column, data]) => {
                    if (column === activeColumnId) {
                        data = arrayMove(editRoutes![overColumnId], activeIndex, overIndex);
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
        
        setEditRoutes((prevState) => {
            const activeItems = editRoutes![activeColumnId];
            const overItems = editRoutes![overColumnId];
            const activeIndex = activeItems.findIndex((i) => i.id === activeId);
            const overIndex = overItems.findIndex((i) => i.id === overId);

            const newIndex = () => {
                const putOnBelowLastItem =
                    overIndex === overItems.length - 1 && delta.y > 0;
                const modifier = putOnBelowLastItem ? 1 : 0;
                return overIndex >= 0 ? overIndex + modifier : overItems.length + 1;
            };

            const d: ResponseData = {}

            Object.entries(prevState!).map(([column, data]) => {
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
            setEditRoutes(clonedItems);
        }
        
        setActiveId(null);
        setClonedItems(null);
    };

    return (
        <DndContext
            sensors={sensors}
            collisionDetection={closestCorners}
            onDragEnd={handleDragEnd}
            onDragOver={handleDragOver}
            onDragCancel={handleDragCancelled}
            onDragStart={handleDragStart}
        >
			<Stack
				direction={"row"}
				spacing={2}
				sx={{
					height: '100%',
					width: '100%',
					overflow: 'auto'
				}}
			>
				{ boardAction == BoardAction.VIEW && viewRoutes &&
					Object.entries(viewRoutes).map(([column, data]) => (
						<SortableRouteDetails key={column} editEnabled={false} column={column} data={data} />
					))
				}

                { boardAction == BoardAction.EDIT && editRoutes &&
					Object.entries(editRoutes).map(([column, data]) => (
						<SortableRouteDetails key={column} editEnabled={true} column={column} data={data} />
					))
				}

			</Stack>
            <DragOverlay>
                {
                    // how to set overlay
                    activeId ? <div>OVERLAY {activeId}</div>: null
                }
            </DragOverlay>
        </DndContext>
    );
}
