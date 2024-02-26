import React from "react";
import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy
} from "@dnd-kit/sortable";
import {ItemType, SortableItem} from './item';
import {Box, Typography} from '@mui/material';

type ContainerProps = {
	containerId: string;
	items: Array<ItemType>;
};

export function Container(props: ContainerProps) {
	const { containerId, items } = props;

	const { setNodeRef } = useDroppable({
		id: containerId
	});

	return (
		<SortableContext
			id={containerId}
			items={items}
			strategy={verticalListSortingStrategy}
		>
			<Box sx={{width: 200, height: 400, borderColor: 'red'}} ref={setNodeRef} className="flex flex-col gap-4 bg-gray-200">
				<Typography className="text-center font-black text-4xl text-gray-700">
					{containerId}
				</Typography>
				{items.map((item) => (
					<SortableItem key={item.id} {...item}/>
				))}
			</Box>
		</SortableContext>
	);
}
