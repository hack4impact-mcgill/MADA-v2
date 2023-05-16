import React, { useReducer, ChangeEvent } from "react";
import { initialState } from "../../../Contexts/LogIn";
import Reducer from "../../../Contexts/LogIn";
import { Stack, Box, Typography } from "@mui/material";
import EmailTextField from "../EmailTextField";
import MADALogo from "../MADALogo";
import ContinueButton from "./ContinueButton";
import CancelButton from "./CancelButton";

const ForgotPasswordForm = () => {
  const [state, dispatch] = useReducer(Reducer, initialState);
  const { email: email } = state;

  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: "setEmail",
      payload: event.target.value,
    });
  };

  const handleClickContinue = async (e: React.FormEvent<HTMLFormElement>) => {
    //Prevent page reload
    e.preventDefault();
    console.log("continue");
    console.log(email);
    //TODO backend that sends email to user with password 
    window.location.href = "/";
  };

  return (
    <Box maxWidth="md">
      <Stack spacing={5}>
        <form onSubmit={handleClickContinue}>
          <Stack spacing={5}>
            <Box display="flex" justifyContent="flex-start">
              <Typography
                className="login-title"
                align="center"
                sx={{
                  fontWeight: "400",
                  color: "#666666",
                  fontFamily: "Poppins",
                  fontSize: "13px",
                  lineHeight: "20px",
                  fontStyle: "normal",
                  paddingLeft: "10px",
                }}
              >
                {" "}
                Enter the email associated with your account.
              </Typography>
            </Box>
            <Box display="flex" align-items="center" justifyContent="center">
              <EmailTextField
                errorText="" //TODO error text from backend if wrong email/password
                helperText="Email not found. Please try again"
                placeHolder="Enter your email"
                updateEmail={handleEmailChange}
                email={email}
              />
            </Box>
            <Box display="flex" align-items="center" flexDirection="column">
              <ContinueButton />
              <CancelButton />
            </Box>
          </Stack>
        </form>
        <Box display="flex" justifyContent="center">
          <MADALogo />
        </Box>
      </Stack>
    </Box>
  );
};

export default ForgotPasswordForm;
