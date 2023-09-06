import { Button } from "@mui/material";
import { isBrowser } from "react-device-detect";

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
        fontSize: isBrowser ? "17px" : "12px",
        color: "#FFFFFF",
        backgroundColor: "#2E5CD3",
        borderRadius: "10px",
        height: isBrowser ? "50px" : "40px",
        width: "75%",
        position: "center",
      }}
    >
      Sign in
    </Button>
  );
};

export default SignInButton;
