import React from 'react';
import { Container, Typography, Stack, Box } from "@mui/material";
import ForgotPasswordForm from '../Components/LogIn/ForgotPassword/ForgotPasswordForm';
import { BsEnvelope } from "react-icons/bs";
import '../Styles/LogIn.css';

const ForgotPasswordContainer=()=>{
    return(
        <div className="forgot-password-container">
        <Container maxWidth="md">
          <Stack spacing={5}>
            <Box display="flex" align-items="center" justifyContent="center">
                <BsEnvelope className="envelopeIcon"/>
            </Box>
            <Typography
              className="login-title"
              align="center"
              sx={{
                fontWeight: "500",
                color: "#666666",
                fontFamily: "Poppins",
                fontSize: "20px",
                lineHeight: "30px",
                fontStyle: "normal",
                marginTop: "0px"
              }}
            >
              {" "}
              An email with your password and username will be sent to your account.  
            </Typography>
            <ForgotPasswordForm />
          </Stack>
        </Container>
      </div>
    )
}

export default ForgotPasswordContainer; 