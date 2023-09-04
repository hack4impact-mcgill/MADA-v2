import React from "react";
import { ModalTextInput } from "./text";
import { ModalDateInput } from "./date";
import { ModalSelectInput } from "./select";
import { ModalMultiselectInput } from "./multiselect";
import { ModalListInput } from "./list";
import { ModalPhoneInput } from "./phone";
import { ModalMultilineInput } from "./multiline";
import { ModalBooleanInput } from "./boolean";
import { MealType } from "../../types";

export type SelectOptionProps = {
  value: any;
  label: string;
};

export type ModalInputProps = {
  label: string;
  type?: string;
  stateValue: MealType;
  stateSetter: any;
  options?: Array<{
    value: string;
    label: string;
  }>;
  valid?: boolean;
};
