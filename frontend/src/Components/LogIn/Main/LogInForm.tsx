import React, { useReducer, ChangeEvent } from "react";
import { initialState } from "../../../Contexts/LogIn";
import Reducer from "../../../Contexts/LogIn";
import { Stack, Box } from "@mui/material";
import RememberMeSwitch from "./RememberMeSwitch";
import EmailTextField from "../EmailTextField";
import PasswordTextField from "./PasswordTextField";
import SignInButton from "./SignInButton";
import ForgotPasswordButton from "./ForgotPasswordButton";
import MADALogo from "../MADALogo";

const LogInForm = () => {
  const [state, dispatch] = useReducer(Reducer, initialState);
  const { email, password, showPassword, rememberMe } = state;

  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: "setEmail",
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

  const handleClickLogIn = async (e: React.FormEvent<HTMLFormElement>) => {
    //Prevent page reload
    e.preventDefault();
    console.log("sign in");
    console.log(email);
    console.log(password);
    console.log(rememberMe);
    //TODO backend

    // temporary redirect to today page
   // window.location.href = "/today";
  };

  return (
    <Stack spacing={5} maxWidth="md">
      <form onSubmit={handleClickLogIn}>
        <Stack spacing={5}>
          <Box display="flex" align-items="center" justifyContent="center">
            <EmailTextField
              errorText="" //TODO error text from backend if wrong email/password
              helperText="Incorrect email or password. Please try again."
              placeHolder="Email"
              updateEmail={handleEmailChange}
              email={email}
            />
          </Box>
          <Box display="flex" align-items="center" justifyContent="center">
            <PasswordTextField
              errorText="" //TODO error text from backend if wrong email/password
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
            <SignInButton />
          </Box>
        </Stack>
      </form>
      <ForgotPasswordButton />
      <Box display="flex" justifyContent="center">
        <MADALogo />
      </Box>
    </Stack>
  );
};

export default LogInForm;
