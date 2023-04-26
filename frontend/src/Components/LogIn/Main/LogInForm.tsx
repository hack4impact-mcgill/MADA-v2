import React, { useReducer, ChangeEvent } from "react";
import { initialState } from "../../../Contexts/LogIn";
import Reducer from "../../../Contexts/LogIn";
import { Stack, Box } from "@mui/material";
import RememberMeSwitch from "./RememberMeSwitch";
import UsernameTextField from "../UsernameTextField";
import PasswordTextField from "./PasswordTextField";
import SignInButton from "./SignInButton";
import ForgotPasswordButton from "./ForgotPasswordButton";
import MADALogo from "../MADALogo";
import { getAllVolunteers } from "../../../services";

const LogInForm = () => {
  const [state, dispatch] = useReducer(Reducer, initialState);
  const { username, password, showPassword, rememberMe, errorText } = state;

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
    console.log(username);
    console.log(password);
    console.log(rememberMe);

    //reset errorText
    handleErrorText("");

    //get all volunteers
    const volunteers = await getAllVolunteers();
    console.log("all volunteers", volunteers);

    //loop through them and check if username and password match
    for (var volunteer of volunteers) {
      if (volunteer.username === username && volunteer.password === password) {
        console.log("login successful, redirecting...");
        //redirect to volunteer today page
        window.location.href = "/today";
        return;
      }
    }
    //no user found with given username and password => display error message
    console.log("login failed, displaying error message...");
    handleErrorText("login failed");
  };

  return (
    <Box maxWidth="md">
      <Stack spacing={5}>
        <form onSubmit={handleClickLogIn}>
          <Stack spacing={5}>
            <Box display="flex" align-items="center" justifyContent="center">
              <UsernameTextField
                errorText={errorText} //TODO error text from backend if wrong username/password
                helperText="Incorrect username or password. Please try again."
                placeHolder="Username or Email"
                updateUsername={handleUsernameChange}
                username={username}
              />
            </Box>
            <Box display="flex" align-items="center" justifyContent="center">
              <PasswordTextField
                errorText={errorText} //TODO error text from backend if wrong username/password
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
    </Box>
  );
};

export default LogInForm;
