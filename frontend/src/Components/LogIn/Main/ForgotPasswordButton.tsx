import { Button } from "@mui/material";
import { isBrowser } from "react-device-detect";

const handleClickForgotPassword = async () => {
  window.location.href = "/password";
};

const ForgotPasswordButton = () => {
  return (
    <Button
      variant="text"
      sx={{
        color: "#666666",
        fontFamily: "Poppins",
        fontWeight: 600,
        fontSize: isBrowser ? "17px" : "12px",
      }}
      onClick={handleClickForgotPassword}
    >
      Forgot your password?
    </Button>
  );
};

export default ForgotPasswordButton;
