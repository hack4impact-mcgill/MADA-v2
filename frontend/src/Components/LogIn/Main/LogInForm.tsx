import React, { useReducer, ChangeEvent } from "react";
import { initialState } from "../../../Contexts/LogIn";
import Reducer from "../../../Contexts/LogIn";
import { Stack, Box, Button } from "@mui/material";
import RememberMeSwitch from "./RememberMeSwitch";
import UsernameTextField from "../UsernameTextField";
import PasswordTextField from "./PasswordTextField";
import SignInButton from "./SignInButton";
import ForgotPasswordButton from "./ForgotPasswordButton";
import MADALogo from "../MADALogo";
import { isBrowser } from "react-device-detect";
import { login } from "../../../services";

export interface CredentialInterface {
  email: string;
  password: string;
}

const LogInForm = () => {
  const [state, dispatch] = useReducer(Reducer, initialState);
  const { username, password, showPassword, rememberMe } = state;

  const handleUsernameChange = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: "setUsername",
      payload: event.target.value,
    });
  };

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: "setPassword",
      payload: event.target.value,
    });
  };

  const handleClickShowPassword = () => {
    dispatch({
      type: "showPassword",
      payload: !showPassword,
    });
  };

  const handleChangeRememberMeSwitch = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    dispatch({
      type: "rememberMe",
      payload: event.target.checked,
    });
  };

  async function handleClickLogIn() {
    //Prevent page reload
    // e.preventDefault();
    console.log("sign in");
    console.log(username);
    console.log(password);

    // console.log(rememberMe);
    //TODO backend
    const response = await login({ email: username, password: password });
    console.log(response);

    // temporary redirect to today page
    // window.location.href = "/today";
  }

  return (
    <Stack spacing={5} maxWidth="md">
      {/* <form onSubmit={handleClickLogIn}> */}
      <Stack spacing={5}>
        <Box display="flex" align-items="center" justifyContent="center">
          <UsernameTextField
            errorText="" //TODO error text from backend if wrong username/password
            helperText="Incorrect username or password. Please try again."
            placeHolder="Username or Email"
            updateUsername={handleUsernameChange}
            username={username}
          />
        </Box>
        <Box display="flex" align-items="center" justifyContent="center">
          <PasswordTextField
            errorText="" //TODO error text from backend if wrong username/password
            updatePassword={handlePasswordChange}
            password={password}
            handleClickShowPassword={handleClickShowPassword}
            showPassword={showPassword}
          />
        </Box>
        <Box display="flex" justifyContent="flex-end">
          <RememberMeSwitch
            updateRememberMeSwitch={handleChangeRememberMeSwitch}
            isRememberMeChecked={rememberMe}
          />
        </Box>
        <Box display="flex" justifyContent="center">
          <Button
            className="login-button"
            type="submit"
            variant="contained"
            sx={{
              fontFamily: "Poppins",
              fontStyle: "normal",
              fontWeight: 600,
              fontSize: isBrowser ? "17px" : "12px",
              color: "#FFFFFF",
              backgroundColor: "#2E5CD3",
              borderRadius: "10px",
              height: isBrowser ? "50px" : "40px",
              width: "75%",
              position: "center",
            }}
            onClick={() => {
              handleClickLogIn();
            }}
          >
            Sign in
          </Button>
        </Box>
      </Stack>
      {/* </form> */}
      <ForgotPasswordButton />
      <Box display="flex" justifyContent="center">
        <MADALogo />
      </Box>
    </Stack>
  );
};

export default LogInForm;
