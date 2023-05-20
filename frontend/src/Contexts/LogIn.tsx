import React, { useReducer } from "react";

//state type
type State = {
  email: string;
  password: string;
  showPassword: boolean;
  rememberMe: boolean;
  errorText: string;
};

export const initialState: State = {
  email: "",
  password: "",
  showPassword: false,
  rememberMe: false,
  errorText: "",
};

type Action =
  | { type: "setEmail"; payload: string }
  | { type: "setPassword"; payload: string }
  | { type: "showPassword"; payload: boolean }
  | { type: "rememberMe"; payload: boolean }
  | { type: "setErrorText"; payload: string };

const Reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "setEmail":
      return {
        ...state,
        email: action.payload,
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
