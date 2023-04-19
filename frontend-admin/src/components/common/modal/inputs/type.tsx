import React from 'react'
import {ModalTextInput} from './text';
import {ModalDateInput} from './date';
import {ModalSelectInput} from './select';
import {ModalMultiselectInput} from './multiselect';

export type SelectOptionProps = {
    value: any,
    label: string
}

export type ModalInputProps = {
    label: string,
    type?: string,
    stateValue: any,
    stateSetter: any,
    options?: any[]
}

export const getInputByType = (inputProps: ModalInputProps) => {
    if (!inputProps.type) {
        return <ModalTextInput {...inputProps}/>
    } else if (inputProps.type && inputProps.type === "date") {
        return <ModalDateInput {...inputProps}/>
    } else if (inputProps.type && inputProps.type === "select") {
        return (<ModalSelectInput {...inputProps}/>)
    } else if (inputProps.type && inputProps.type === "multiselect") {
        return (<ModalMultiselectInput {...inputProps}/>)
    }
}
