import React, {useState} from 'react'
import { Box, Button, MenuItem, FormLabel, TextField } from '@mui/material';
import {SelectOptionProps, ModalInputProps} from './type';
import {inputStyle} from './style'
import { SelectInput } from './select';

const InputRow = (props: {index: number, handleRemove: any, state: MealProps[], setter: any, options: any[]}) => {
    const {index, handleRemove, state, setter, options} = props;
    const [quantity, type, clientId] = [state[index].quantity, state[index].type, state[index].clientId]

    const handleQuantityChange = (event: any) => {
        const updatedState = state.map((m: MealProps) => {
            return m.index === index ? {...m, quantity: event.target.value} : m;
        });
        setter(updatedState)
    }

    const handleTypeChange = (event: any) => {
        const updatedState = state.map((m: MealProps) => {
            return m.index === index ? {...m, type: event.target.value} : m;
        });
        setter(updatedState)
    }

    const handleClientChange = (event: any) => {
        const updatedState = state.map((m: MealProps) => {
            return m.index === index ? {...m, clientId: event.target.value} : m;
        });
        setter(updatedState)
    }
    
    const selectClientProps = {
        label: "Client",
        type: "select",
        stateValue: clientId,
        stateSetter: handleClientChange,
        options: options
    }

    return (
        <Box sx={{display: 'flex', flexDirection: 'row'}}>
            <Button size={"small"} onClick={() => handleRemove(index)}>X</Button>
            <TextField {...inputStyle} type={'number'} value={quantity} placeholder={"quantity"} onChange={handleQuantityChange}></TextField>
            <TextField {...inputStyle} type={'text'} value={type} placeholder={"meal type"} onChange={handleTypeChange}></TextField>
            <SelectInput {...selectClientProps}/>
        </Box>
    )
}

export type MealProps = {
    index: number,
    quantity: number,
    type: string,
    clientId: number | null
}

export const ModalListInput = (props: ModalInputProps) => {
    const handleAddToList = () => {
        props.stateSetter([...props.stateValue, {
            index: props.stateValue.length,
            quantity: 0,
            type: "",
            clientId: null
        }])
    }

    const handleRemoveFromList = () => {
        props.stateSetter(props.stateValue.slice(0, -1));
    }
    
    return (
    <>
        <Box sx={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
            <FormLabel>{props.label}</FormLabel>
            <Button size={"small"} onClick={handleAddToList}>Add</Button>
        </Box>
        { props.stateValue.length == 0 ? <Box>No meals</Box> : <>{
            props.stateValue.map((item: MealProps, index: number) =>
                <InputRow index={index} handleRemove={handleRemoveFromList} state={props.stateValue} setter={props.stateSetter} options={props.options!}/>
            )
        }</>}
    </>)
}
