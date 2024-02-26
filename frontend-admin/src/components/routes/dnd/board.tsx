import React, { useState, useMemo, useEffect } from "react";
import {
  DndContext,
  closestCorners,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
	SortableContext,
  } from "@dnd-kit/sortable";
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import type {
  DragOverEvent,
  DragStartEvent,
  UniqueIdentifier
} from "@dnd-kit/core";
import {Stack} from '@mui/material';

import {
    useQuery,
} from '@tanstack/react-query'
import {getRouteDeliveriesSimple} from 'src/api/route-deliveries'

import { Container } from "./container";

export default function App() {
	const { isLoading, isError, data, error } = useQuery(['routeDeliveries'], () => getRouteDeliveriesSimple())

	useEffect(() => {
		if (data) {
			setRouteItems(data!.data.routes);
			try {
				const numbers: [] = data!.data.routes.length > 0 ? data!.data.routes.map((route: any) => route.routeNumber) : []
				setColumnIds([...new Set(numbers)]);
			} catch {

			}
		}
	  }, [data]);

	// initalized as all routes from database
	const [routeItems, setRouteItems] = useState([]);
	const [activeRouteId, setActiveRouteId] = useState<UniqueIdentifier | null>(null);

	// initialized as all routes from database list of ids
	const [columnIds, setColumnIds] = useState<number[]>([]);
  	const [activeColumnId, setActiveColumnId] = useState(null);
  
	const sensors = useSensors(
		useSensor(PointerSensor),
		useSensor(KeyboardSensor, {
			coordinateGetter: sortableKeyboardCoordinates
		})
	);

	function handleDragStart(event: DragStartEvent) {
		const { active } = event;
		const { id } = active;

		setActiveRouteId(id);
	}

	function handleDragEnd(event: DragEndEvent) {
		setActiveColumnId(null);
		setActiveRouteId(null);
	
		const { active, over } = event;
		if (!over) return;
	
		const activeId = active.id;
		const overId = over.id;
	
		if (activeId === overId) return;
	
		setColumnIds((columns) => {
			const activeColumnIndex = columns.findIndex((col) => col === activeId);
		
			const overColumnIndex = columns.findIndex((col) => col === overId);
		
			return arrayMove(columns, activeColumnIndex, overColumnIndex);
		});
	}


	function handleDragOver(event: DragOverEvent) {
		const { active, over } = event;
		if (!over) return;
	
		const activeId = active.id;
		const overId = over.id;
	
		if (activeId === overId) return;
	
		const isActiveATask = active.data.current?.type === "Task";
		const isOverATask = over.data.current?.type === "Task";
	
		if (!isActiveATask) return;
	
		// Im dropping a Task over another Task
		if (isActiveATask && isOverATask) {
			setRouteItems((routeItems: any) => {
				const activeIndex = routeItems.findIndex((r: any) => r.id === activeId);
				const overIndex = routeItems.findIndex((r: any) => r.id === overId);
		
				if (routeItems[activeIndex].routeNumber != routeItems[overIndex].routeNumber) {
					// Fix introduced after video recording
					routeItems[activeIndex].routeNumber = routeItems[overIndex].routeNumber;
					return arrayMove(routeItems, activeIndex, overIndex - 1);
				}
		
				return arrayMove(routeItems, activeIndex, overIndex);
			});
		}
	
		const isOverAColumn = over.data.current?.type === "Column";
	
		// Im dropping a Task over a column
		if (isActiveATask && isOverAColumn) {
			setRouteItems((routeItems: any) => {
				const activeIndex = routeItems.findIndex((r: any) => r.id === activeId);
		
				routeItems[activeIndex].routeNumber = overId;
				console.log("DROPPING TASK OVER COLUMN", { activeIndex });
				return arrayMove(routeItems, activeIndex, activeIndex);
			});
		}
	}

	function createNewColumn() {
		setColumnIds([...columnIds, columnIds.length + 1]);
	  }

	return (
		<DndContext
			sensors={sensors}
			collisionDetection={closestCorners}
			onDragStart={handleDragStart}
			onDragOver={handleDragOver}
			onDragEnd={handleDragEnd}
		>
			<SortableContext
				items={columnIds}
			>
				<Stack direction={"row"}>
					{columnIds.map((col) => (
						<Container
							containerId={col.toString()}
							items={routeItems ? routeItems.filter((routeItem: any) => routeItem.routeNumber === col) : []}
						/>
					))}
				</Stack>
			</SortableContext>
			<button
				onClick={() => {
					createNewColumn();
				}}
			>
				Add Column
			</button>
			{/* <Stack direction={"row"}>
				{columnIds.map((col) => (
					<Container
						containerId={col.toString()}
						items={routeItems ? routeItems.filter((routeItem: any) => routeItem.routeNumber === col) : []}
					/>
				))}
				<button
					onClick={() => {
						createNewColumn();
					}}
				>
					Add Column
				</button>
			</Stack> */}
			
		</DndContext>
	);
}