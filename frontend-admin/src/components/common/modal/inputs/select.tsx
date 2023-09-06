import React from "react";
import { MenuItem, FormLabel, TextField, Select } from "@mui/material";
import { SelectOptionProps, ModalInputProps } from "./type";
import { inputStyle } from "./style";

export const SelectInput = (props: ModalInputProps) => {
  return (
    <TextField
      select
      {...inputStyle}
      sx={{ width: "100%" }}
      SelectProps={{
        value: props.stateValue,
        onChange: props.stateSetter,
      }}
    >
      {props.options!.map((option: SelectOptionProps) => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </TextField>
  );
};

export const ModalSelectInput = (props: ModalInputProps) => {
  return (
    <>
      <FormLabel>{props.label}</FormLabel>
      <Select
        size={"small"}
        sx={{ marginBottom: 2 }}
        value={props.stateValue}
        onChange={props.stateSetter}
      >
        {props.options!.map((option: SelectOptionProps) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </>
  );
};
