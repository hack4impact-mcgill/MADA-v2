import React from "react";
import { Container, Typography, Stack, Box } from "@mui/material";
import ForgotPasswordForm from "../Components/LogIn/ForgotPassword/ForgotPasswordForm";
import { BsEnvelope } from "react-icons/bs";
import "../Styles/LogIn.css";
import { isBrowser } from "react-device-detect";

const ForgotPasswordContainer = () => {
  return (
    <div
      className="forgot-password-container"
      style={{
        overflowX: "hidden",
        overflowY: "hidden",
        height: "100vh",
        width: "100vw",
      }}
    >
      <Container maxWidth="md">
        <Stack
          spacing={5}
          margin={"auto"}
          justifyContent={"center"}
          alignItems={"center"}
          sx={{ height: "100vh" }}
        >
          {/* <Box
            display="flex"
            align-items="center"
            justifyContent="center"
            sx={{ backgroundColor: "Highlight", maxHeight: "100px" }}
          > */}
          <BsEnvelope
            className="envelopeIcon"
            style={{
              padding: 0,
              alignSelf: "center",
              fontSize: isBrowser ? "100px" : "50px",
            }}
          />
          {/* </Box> */}
          <Typography
            className="login-title"
            align="center"
            sx={{
              fontWeight: "500",
              color: "#666666",
              fontFamily: "Poppins",
              fontSize: isBrowser ? "20px" : "14px",
              lineHeight: "30px",
              fontStyle: "normal",
              marginTop: "0px",
            }}
          >
            {" "}
            An email with your password and username will be sent to your
            account.
          </Typography>
          <ForgotPasswordForm />
        </Stack>
      </Container>
    </div>
  );
};

export default ForgotPasswordContainer;
