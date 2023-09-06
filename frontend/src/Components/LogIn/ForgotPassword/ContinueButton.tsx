import { Button } from "@mui/material";
import { isBrowser } from "react-device-detect";

const ContinueButton = () => {
  return (
    <Button
      className="continue-button"
      type="submit"
      variant="contained"
      sx={{
        fontFamily: "Poppins",
        fontStyle: "normal",
        fontWeight: 600,
        fontSize: isBrowser ? "17px" : "12px",
        color: "#FFFFFF",
        backgroundColor: "#2E5CD3",
        borderRadius: "5px",
        height: isBrowser ? "60px" : "40px",
        width: "90%",
        marginLeft: "5%",
        marginRight: "5%",
      }}
    >
      Continue
    </Button>
  );
};

export default ContinueButton;
