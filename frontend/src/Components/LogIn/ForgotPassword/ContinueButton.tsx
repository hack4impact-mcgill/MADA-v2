import { Button } from "@mui/material";

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
        fontSize: "17px",
        color: "#FFFFFF",
        backgroundColor: "#2E5CD3",
        borderRadius: "5px",
        height: "60px",
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
