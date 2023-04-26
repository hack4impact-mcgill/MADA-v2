import React, { useReducer } from "react";

//state type
type State = {
  username: string;
  password: string;
  showPassword: boolean;
  rememberMe: boolean;
  errorText: string;
};

export const initialState: State = {
  username: "",
  password: "",
  showPassword: false,
  rememberMe: false,
  errorText: "",
};

type Action =
  | { type: "setUsername"; payload: string }
  | { type: "setPassword"; payload: string }
  | { type: "showPassword"; payload: boolean }
  | { type: "rememberMe"; payload: boolean }
  | { type: "setErrorText"; payload: string }

const Reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "setUsername":
      return {
        ...state,
        username: action.payload,
      };
    case "setPassword":
      return {
        ...state,
        password: action.payload,
      };
    case "showPassword":
      return {
        ...state,
        showPassword: action.payload,
      };
    case "rememberMe":
      return {
        ...state,
        rememberMe: action.payload,
      };
    case "setErrorText":
      return {
        ...state,
        errorText: action.payload,
      };
    default:
      return state;
  }
};

export default Reducer;
