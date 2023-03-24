import { Button } from "@mui/material";

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
        fontSize: "17px",
      }}
      onClick={handleClickForgotPassword}
    >
      Forgot your password?
    </Button>
  );
};

export default ForgotPasswordButton;
