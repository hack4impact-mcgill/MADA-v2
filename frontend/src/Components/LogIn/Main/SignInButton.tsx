import { Button } from "@mui/material";

const SignInButton = () => {
  return (
    <Button
      className="login-button"
      type="submit"
      variant="contained"
      sx={{
        fontFamily: "Poppins",
        fontStyle: "normal",
        fontWeight: 600,
        fontSize: "17px",
        color: "#FFFFFF",
        backgroundColor: "#2E5CD3",
        borderRadius: "10px",
        height: "50px",
        width: "75%",
        position: "center",
      }}
    >
      Sign in
    </Button>
  );
};

export default SignInButton;