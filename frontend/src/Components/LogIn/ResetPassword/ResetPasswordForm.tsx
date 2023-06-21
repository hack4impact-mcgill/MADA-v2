import React, { useState, useReducer, ChangeEvent } from "react";
import { initialState } from "../../../Contexts/LogIn";
import Reducer from "../../../Contexts/LogIn";
import { Stack, Box, Button, Typography, FormHelperText, Input, FormControl } from "@mui/material";
import MADALogo from "../MADALogo";
import { resetPassword } from "../../../services";
import { isBrowser } from "react-device-detect";
import { useParams } from 'react-router-dom';

const setHelperText = (errorText: string, helperText: string) => {
  if (errorText.length === 0) {
    return "";
  } else {
    return helperText;
  }
};

const InputTextField = (props: {
  errorText: string;
  helperText: string;
  placeHolder: string;
  updateValue: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
}) => {
  return (
    <Stack spacing={5} sx={{ width: "100%" }}>
      <Box display="flex" align-items="center" justifyContent="center">
        <FormControl sx={{ width: "90%" }}>
          <FormHelperText error={props.errorText.length === 0}>
            {setHelperText(props.errorText, props.helperText)}
          </FormHelperText>
          <Input
            error={props.errorText.length === 0 ? false : true}
            placeholder={props.placeHolder}
            type="text"
            sx={{
              fontFamily: "Poppins",
              fontStyle: "normal",
              fontWeight: "400",
              fontSize: isBrowser ? "17px" : "12px",
            }}
            onChange={props.updateValue}
            value={props.value}
            required={true}
          />
        </FormControl>
      </Box>
    </Stack>
  );
};

const ResetPasswordForm = () => {
  const [newPassword, setNewPassword] = useState("");
  const [reEnteredPassword, setReEnteredPassword] = useState("");
  
  const { token, id } = useParams();
  
  const handleClickResetPassword = async () => {
    if (newPassword == reEnteredPassword) {
      await resetPassword(parseInt(id!), token!, newPassword);
    }
  };

  return (
    <Box maxWidth="md">
      <Stack spacing={5}>
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
              <Stack>
                <InputTextField
                  errorText=""
                  helperText="New password not found. Please try again"
                  placeHolder="New password"
                  updateValue={(e: React.ChangeEvent<HTMLInputElement>) => setNewPassword(e.target.value)}
                  value={newPassword}
                />

                <InputTextField
                  errorText=""
                  helperText="Re-entered password not found. Please try again"
                  placeHolder="Re-enter your password"
                  updateValue={(e: React.ChangeEvent<HTMLInputElement>) => setReEnteredPassword(e.target.value)}
                  value={reEnteredPassword}
                />

                <Button
                  onClick={handleClickResetPassword}
                >
                  Reset
                </Button>
              </Stack>
            </Box>
          </Stack>
        <Box display="flex" justifyContent="center">
          <MADALogo />
        </Box>
      </Stack>
    </Box>
  );
};

export default ResetPasswordForm;
