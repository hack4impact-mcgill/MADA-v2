import React, {useState} from 'react'
import {Button, Box, ButtonProps} from '@mui/material';
import { GridFooterContainer, GridFooter, DataGrid, getGridDateOperators, GridSlotsComponentsProps } from '@mui/x-data-grid';
import {getURLParamsFromFilter} from 'src/components/tasks/utils';

export type FooterStatus = 'past' | 'upcoming' | null;

declare module '@mui/x-data-grid' {
    interface FooterPropsOverrides {
        status: FooterStatus;
        setStatus: any;
        setFilter: any;
        setURLFilterParams: any;
    }
}

const enabledProps = {
    variant: 'contained',
    disableElevation: true,
} as ButtonProps

const getToday = () => {
    const date = new Date();
    const year = date.toLocaleString("default", { year: "numeric" });
    const month = date.toLocaleString("default", { month: "2-digit" });
    const day = date.toLocaleString("default", { day: "2-digit" });
    const formattedDate = year + "-" + month + "-" + day;
    return formattedDate;
}

export const Footer = (props: NonNullable<GridSlotsComponentsProps['footer']>) => {
    const { status, setStatus, setFilter, setURLFilterParams } = props;

    const pastProps = status === 'past' ? enabledProps : {};
    const upcomingProps = status === 'upcoming' ? enabledProps : {};

    const handlePastClick = () => {
        if (status === 'past') {
            setURLFilterParams(getURLParamsFromFilter([]));
            setFilter([])
            setStatus(null)
        } else {
            const items = [{ field: 'deliveryTime', operator: 'before', value: getToday() }]
            setURLFilterParams(getURLParamsFromFilter(items));
            setFilter(items)
            setStatus('past')
        }
    }

    const handleUpcomingClick = () => {
        if (status === 'upcoming') {
            setURLFilterParams(getURLParamsFromFilter([]));
            setFilter([])
            setStatus(null)
        } else {
            const items = [{ field: 'deliveryTime', operator: 'onOrAfter', value: getToday() }]
            setURLFilterParams(getURLParamsFromFilter(items));
            setFilter(items)
            setStatus('upcoming')
        }
    }

    return (
        <GridFooterContainer>
            <Box sx={{display: 'flex', ml: 1}}>
                <Button {...pastProps} size="small" onClick={handlePastClick}>Past</Button>
                <Box width={8}/>
                <Button {...upcomingProps} sx={{width: 90}} size="small" onClick={handleUpcomingClick}>Upcoming</Button>
            </Box>
            <GridFooter sx={{
                border: 'none',
            }} />
        </GridFooterContainer>
    )
}