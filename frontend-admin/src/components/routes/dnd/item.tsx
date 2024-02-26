import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import {Box, Typography} from '@mui/material';

type SortableItemProps = ItemType;

export function Item({ id, mealType, program }: ItemType) {
	return (
		<Box sx={{p: 4}}>
			<Typography>{id}</Typography>
			<Typography>{mealType}</Typography>
			<Typography>{program}</Typography>
		</Box>
	);
}

export function SortableItem(props: SortableItemProps) {
	const { id, mealType, program } = props;
	const {
		attributes,
		listeners,
		setNodeRef,
		transform,
		transition
	} = useSortable({ id });

	const style = {
		transform: transform
		? `translate3d(${transform.x}px, ${Math.round(
			transform.y
			)}px, 0) scaleX(${transform.scaleX})`
		: "",
		transition
	};

	return (
		<Box ref={setNodeRef} style={style} {...attributes} {...listeners}>
			<Item id={id} mealType={mealType} program={program} />
		</Box>
	);
}

export type ItemType = {
	id: string;
	mealType: string;
	program: string
};