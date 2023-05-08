import React from 'react'
import {ModalTextInput} from './text';
import {ModalDateInput} from './date';
import {ModalSelectInput} from './select';
import {ModalMultiselectInput} from './multiselect';
import {ModalListInput} from './list';
import {ModalPhoneInput} from './phone';
import {ModalMultilineInput} from './multiline';
import { ModalBooleanInput } from './boolean';

export type SelectOptionProps = {
    value: any,
    label: string
}

export type ModalInputProps = {
    label: string,
    type?: string,
    stateValue: any,
    stateSetter: any,
    options?: any[],
    valid?: boolean,
}