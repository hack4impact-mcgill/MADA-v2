import React, { useReducer } from "react";

//state type
type State = {
  username: string;
  password: string;
  userId?: number;
  showPassword: boolean;
  rememberMe: boolean;
};

export const initialState: State = {
  username: "",
  password: "",
  showPassword: false,
  rememberMe: false,
};

type Action =
  | { type: "setUsername"; payload: string }
  | { type: "setPassword"; payload: string }
  | { type: "setUserId"; payload: number | undefined }
  | { type: "showPassword"; payload: boolean }
  | { type: "rememberMe"; payload: boolean };

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
    default:
      return state;
  }
};

export default Reducer;
