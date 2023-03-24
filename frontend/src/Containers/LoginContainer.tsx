import React from "react";
import { Container, Typography, Stack } from "@mui/material";
import LogInForm from "../Components/LogIn/Main/LogInForm";

const LoginContainer = () => {
  return (
    <div className="login-container">
      <Container maxWidth="md">
        <Stack spacing={10}>
          <Typography
            className="login-title"
            align="center"
            sx={{
              fontWeight: "700",
              color: "#666666",
              fontFamily: "Poppins",
              fontSize: "24px",
              lineHeight: "36px",
              fontStyle: "Bold",
              fill: "solid",
              pt: 10,
              paddingTop: "35%"
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