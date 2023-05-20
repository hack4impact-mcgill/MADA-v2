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
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import { login } from "../api/auth";

const cookies = new Cookies();

const LogInForm = () => {
  const [state, dispatch] = useReducer(Reducer, initialState);
  const { email, password, showPassword, rememberMe, errorText} = state;
  const navigate = useNavigate();

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

  const handleErrorText = (text: string) => {
    dispatch({
      type: "setErrorText",
      payload: text,
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

    //reset errorText
    handleErrorText("");

    //TODO replace username by email 
    try {
      const response = await login({email: email, password: password})
    
      cookies.set("TOKEN", response.data.token, {
        path: "/",
        sameSite: "strict",
      });
    
      navigate('/today')
    
      } catch (error) {
        //no user found with given email and password => display error message
        console.log(error)
        console.log("login failed, displaying error message...");
        handleErrorText("login failed");
      }
  };

  return (
    <Stack spacing={5} maxWidth="md">
      <form onSubmit={handleClickLogIn}>
        <Stack spacing={5}>
          <Box display="flex" align-items="center" justifyContent="center">
            <EmailTextField
              errorText={errorText} //TODO error text from backend if wrong email/password
              helperText="Incorrect email or password. Please try again."
              placeHolder="Email"
              updateEmail={handleEmailChange}
              email={email}
            />
          </Box>
          <Box display="flex" align-items="center" justifyContent="center">
            <PasswordTextField
              errorText={errorText} //TODO error text from backend if wrong email/password
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
