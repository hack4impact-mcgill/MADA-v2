import React, {useEffect, useState} from "react";
import SortableRouteDetails from './route-details';
import {
    closestCenter,
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
import {Box, Typography, Stack, Grid, IconButton, Button} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import {BoardAction} from '../page';
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {saveAllRouteDeliveries} from 'src/api/route-deliveries'
import {
    useQuery,
} from '@tanstack/react-query'
import {getRouteDeliveries} from 'src/api/route-deliveries'
import {StopDetails} from "./stop-details";

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

    function findContainer(id: UniqueIdentifier) {
        // Route Id
        if (Object.keys(editRoutes!).find((key) => key == id)) {
            return id.toString();
        }
        
        // Stop Id
        const foundId = Object.keys(editRoutes!).find(key =>
            editRoutes![key].findIndex(route => route.id === id) !== -1
        );
        return foundId?.toString()
    }

    function findStop(id: UniqueIdentifier) {
        const containerId = findContainer(id)
        const stop = editRoutes![containerId!].find((stop) => stop.id == id)
        return stop
    }

    const handleDragStart = (event: DragStartEvent) => {
        const { active } = event;
        setActiveId(active.id);
        setClonedItems(editRoutes);
    }

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        const { id } = active;
        const overId = over!.id!

        const activeContainer = findContainer(id);
        const overContainer = findContainer(overId);

        if (
            !activeContainer ||
            !overContainer ||
            activeContainer !== overContainer
        ) {
            return;
        }

        const activeIndex = editRoutes![activeContainer].findIndex((i) => i.id === activeId);
        const overIndex = editRoutes![overContainer].findIndex((i) => i.id === overId);

        if (activeIndex !== overIndex) {
            setEditRoutes((prevState) => {
                const d:ResponseData = {}
                Object.entries(prevState!).map(([column, data]) => {
                    if (column === overContainer) {
                        data = arrayMove(editRoutes![overContainer], activeIndex, overIndex);
                        d[column] = data
                    } else {
                        d[column] = data
                    }
                })

                return d
            });
        }

        setActiveId(null);
    };

    const handleDragOver = (event: DragOverEvent) => {
        const { active, over, delta } = event;
        const { id } = active;
        const overId = over!.id

        // Find the containers
        const activeContainer = findContainer(id);
        const overContainer = findContainer(overId);

        if (
            !activeContainer ||
            !overContainer ||
            activeContainer === overContainer
        ) {
            return;
        }

        setEditRoutes((prevState) => {
            const activeItems = editRoutes![activeContainer];
            const overItems = editRoutes![overContainer];
            const activeIndex = activeItems.findIndex((i) => i.id === activeId);
            const overIndex = overItems.findIndex((i) => i.id === overId);

            let newIndex: number;
            if (Object.keys(prevState!).find((key) => key == overId)) {
                // We're at the root droppable of a container
                newIndex = overItems.length + 1;
            } else {
                const putOnBelowLastItem = overIndex === overItems.length - 1 && delta.y > 0;
                const modifier = putOnBelowLastItem ? 1 : 0;
                newIndex = overIndex >= 0 ? overIndex + modifier : overItems.length + 1;
            }
            
            const d: ResponseData = {}

            Object.entries(prevState!).map(([column, data]) => {
                if (column === activeContainer) {
                    data = activeItems.filter((i) => i.id !== activeId);
                    d[column] = data
                } else if (column === overContainer) {
                    data = [...overItems.slice(0, newIndex),
                        activeItems[activeIndex],
                        ...overItems.slice(newIndex, overItems.length),
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

    const handleCreateRoute = (event: React.MouseEvent<HTMLButtonElement>) => {
        const editRouteLength = Object.keys(editRoutes!).length;

        setEditRoutes((prevState) => {
            const d: ResponseData = {}

            Object.entries(prevState!).map(([column, data]) => {
                d[column] = data
            })
            
            d[editRouteLength] = []

            return d
        });
    }

    return (
        <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
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
                    <>
					{
                        Object.entries(editRoutes).map(([column, data]) => (
                            <SortableRouteDetails key={column} editEnabled={true} column={column} data={data} />
                        ))
                    }
                        <Box>
                            <Button variant='outlined' onClick={handleCreateRoute}>
                                <AddIcon/>
                            </Button>
                        </Box>
                    </>
				}
			</Stack>
            <DragOverlay>
                {
                    activeId ? <StopDetails {...{id: activeId as string, mealType: findStop(activeId)!.mealType, program: findStop(activeId)!.program}}/>: null
                }
            </DragOverlay>
        </DndContext>
    );
}
