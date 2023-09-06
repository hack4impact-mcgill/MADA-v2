import React from "react";
import { Container, Typography, Stack } from "@mui/material";
import { isBrowser } from "react-device-detect";
import LogInForm from "../Components/LogIn/Main/LogInForm";

const LoginContainer = () => {
  return (
    <div
      className="login-container"
      style={{
        overflowX: "hidden",
        overflowY: "hidden",
        height: "100vh",
        width: "100vw",
      }}
    >
      <Container maxWidth="md">
        <Stack spacing={5}>
          <Typography
            className="login-title"
            align="center"
            sx={{
              fontWeight: "700",
              color: "#666666",
              fontFamily: "Poppins",
              fontSize: isBrowser ? "24px" : "18px",
              lineHeight: "36px",
              fontStyle: "Bold",
              fill: "solid",
              pt: 10,
              paddingTop: "10vh",
            }}
          >
            {" "}
            MADA Meals À Partager
          </Typography>
          <LogInForm />
        </Stack>
      </Container>
    </div>
  );
};

export default LoginContainer;
