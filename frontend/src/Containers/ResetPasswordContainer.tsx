import React from "react";
import { Container, Stack } from "@mui/material";
import "../Styles/LogIn.css";
import ResetPasswordForm from "../Components/LogIn/ResetPassword/ResetPasswordForm";

const ResetPasswordContainer = () => {
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
          <ResetPasswordForm />
        </Stack>
      </Container>
    </div>
  );
};

export default ResetPasswordContainer;
