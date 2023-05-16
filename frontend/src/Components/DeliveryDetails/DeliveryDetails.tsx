import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { TaskInterface } from "../../Contexts/Tasks";
import { useLocation } from "react-router-dom";
import CloseButton from "../MyHistory/CloseButton";
import { isBrowser } from "react-device-detect";
import TextField from "@mui/material/TextField";

export default function DeliveryDetails(props: { task: TaskInterface | null }) {
  console.log(props.task);
  const location = useLocation();
  const task = location.state?.task;

  const [isOpen, setIsOpen] = React.useState(false);
  const takeNote = () => {};

  return task ? (
    <Box>
      {/* <Box sx={{ position: "fixed" }}> */}
      <CloseButton></CloseButton>
      {/* </Box> */}
      <Box
        sx={{
          justifyContent: "center",
          alignContent: "center",
          alignSelf: "center",
          marginTop: isBrowser ? "5vh" : "5vh",
          alignItems: "center",
          paddnig: "auto",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box>
          <Typography
            sx={{
              fontFamily: "Poppins",
              fontWeight: 600,
              fontSize: 25,
              ml: "22px",
              mb: 1,
            }}
          >
            Delivery Information
          </Typography>

          <Typography
            sx={{
              fontFamily: "Poppins",
              fontWeight: 600,
              fontSize: 17,
              ml: "22px",
              mb: 1,
            }}
          >
            Name
          </Typography>
          <Typography
            sx={{
              fontFamily: "Poppins",
              fontWeight: 300,
              fontSize: 17,
              ml: "22px",
              mb: 1,
            }}
          >
            {task.name}
          </Typography>
          <Typography
            sx={{
              fontFamily: "Poppins",
              fontWeight: 600,
              fontSize: 17,
              ml: "22px",
              mb: 1,
            }}
          >
            Address
          </Typography>
          <Typography
            sx={{
              fontFamily: "Poppins",
              fontWeight: 300,
              fontSize: 17,
              ml: "22px",
              mb: 1,
            }}
          >
            3380 Bd Robert-Bourassa Montreal QC
          </Typography>
          {/* <Typography>{task.address}</Typography> */}
          <Typography
            sx={{
              fontFamily: "Poppins",
              fontWeight: 600,
              fontSize: 17,
              ml: "22px",
              mb: 1,
            }}
          >
            Date
          </Typography>
          <Typography
            sx={{
              fontFamily: "Poppins",
              fontWeight: 300,
              fontSize: 17,
              ml: "22px",
              mb: 1,
            }}
          >
            April 27, 2023 2:55PM
          </Typography>
          {/* <Typography>{task.deliveryTime}</Typography> */}
        </Box>
        <div className="google-map-code">
          <iframe
            // src="https://maps.google.com/maps?q=3380+Bd+Robert-Bourassa+Montreal+QC&output=embed"
            src={
              "https://maps.google.com/maps?q=" +
              encodeURIComponent("3300 Bd Robert-Bourassa Montreal QC") +
              "&output=embed"
            }
            width={isBrowser ? "600" : "350"}
            height={isBrowser ? "450" : "300"}
            // frameborder="0"
            style={{ border: 2, margin: "30px" }}
            // allowfullscreen
          ></iframe>
        </div>
      </Box>

      <Box
        sx={{
          ml: isBrowser ? "100px" : "50px",
          mr: isBrowser ? "100px" : "50px",
          mb: "40px",
          alignItems: "center",
          justifyContent: "center",
          alignContent: "center",
          alignSelf: "center",
          paddnig: "auto",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography
          sx={{
            width: "153px",
            height: " 51px",
            borderRadius: "10px",
            fontFamily: "Poppins",
            fontStyle: "normal",
            fontWeight: 600,
            fontSize: "15px",
            lineHeight: "22px",
            borderWidth: "0px",
            color: "#ffffff",
            background: "#2E5CD3",
            alignSelf: "center",
          }}
        >
          Add Note
        </Typography>
        <TextField
          style={{ display: isOpen ? "block" : "none" }}
          multiline={true}
          variant="outlined"
          fullWidth
        ></TextField>
        <Box sx={{ display: "flex", flexDirection: "row" }}>
          <Button
            sx={{
              width: "153px",
              height: "51px",
              borderRadius: "10px",
              fontFamily: "Poppins",
              fontStyle: "normal",
              fontWeight: 600,
              fontSize: "15px",
              lineHeight: "22px",
              borderWidth: "0px",
              color: "#ffffff",
              background: "#2E5CD3",
              alignSelf: "center",
              margin: "10px",
              display: isOpen ? "block" : "none",
            }}
            onClick={() => {
              setIsOpen(false);
            }}
          >
            Cancel
          </Button>
          <Button
            sx={{
              width: "153px",
              height: " 51px",
              borderRadius: "10px",
              fontFamily: "Poppins",
              fontStyle: "normal",
              fontWeight: 600,
              fontSize: "15px",
              lineHeight: "22px",
              borderWidth: "0px",
              color: "#ffffff",
              background: "#2E5CD3",
              alignSelf: "center",
              display: isOpen ? "block" : "none",
            }}
            onClick={() => {
              //do smth
            }}
          >
            Submit
          </Button>
        </Box>
      </Box>
    </Box>
  ) : null;
}
