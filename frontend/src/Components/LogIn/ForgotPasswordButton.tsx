import { Button } from "@mui/material";

const handleClickForgotPassword = async () => {
    //TODO when page is created for forgot password
    console.log("forgot password");
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