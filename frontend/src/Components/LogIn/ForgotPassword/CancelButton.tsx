import { Button } from "@mui/material";

const handleClickCancel = async () => {
  window.location.href = "/";
};

const CancelButton = () => {
  return (
    <Button
      className="cancel-button"
      variant="contained"
      sx={{
        fontFamily: "Poppins",
        fontStyle: "normal",
        fontWeight: 600,
        fontSize: "17px",
        color: "#666666",
        backgroundColor: "#FFFFFF;",
        borderRadius: "5px",
        height: "60px",
        width: "90%",
        marginTop: "5%",
        marginLeft: "5%",
        marginRight: "5%",
      }}
      onClick={handleClickCancel}
    >
      Cancel
    </Button>
  );
};

export default CancelButton;
