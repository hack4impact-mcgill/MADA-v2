import React, { useEffect } from "react";
import { useState } from "react";
import {
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Switch,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MdExpandMore } from "react-icons/md";
import "../Styles/Availabilities.css";
import { useNavigate } from "react-router-dom";
import { getOneVolunteer } from "../services";

type TimePickerAccordionProps = {
  dayOfWeek: string;
};

const MarkAvailability = () => {
  const navigate = useNavigate();

  // const [monday, setMonday] = useState<string>();
  // const [tuesday, setTuesday] = useState<string>();
  // const [wednesday, setWednesday] = useState<string>();
  // const [thursday, setThursday] = useState<string>();
  // const [friday, setFriday] = useState<string>();
  // const [saturday, setSaturday] = useState<string>();
  // const [sunday, setSunday] = useState<string>();

  let monday = "";
  let tuesday = "";
  let wednesday = "";
  let thursday = "";
  let friday = "";
  let saturday = "";
  let sunday = "";

  const daysOfWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  function setTimes(dayOfWeek: string, time: string) {
    switch (dayOfWeek) {
      case "Monday":
        // setMonday(time);
        monday = time;
        break;
      case "Tuesday":
        // setTuesday(time);
        tuesday = time;
        break;
      case "Wednesday":
        // setWednesday(time);
        wednesday = time;
        break;
      case "Thursday":
        // setThursday(time);
        thursday = time;
        break;
      case "Friday":
        // setFriday(time);
        friday = time;
        break;
      case "Saturday":
        // setSaturday(time);
        saturday = time;
        break;
      case "Sunday":
        // setSunday(time);
        sunday = time;
        break;
    }
  }

  function GetTimes(dayOfWeek: string) {
    switch (dayOfWeek) {
      case "Monday":
        return monday;
      case "Tuesday":
        return tuesday;
      case "Wednesday":
        return wednesday;
      case "Thursday":
        return thursday;
      case "Friday":
        return friday;
      case "Saturday":
        return saturday;
      case "Sunday":
        return sunday;
      default:
        return monday;
    }
  }

  //Initialize the availabilities
  useEffect(() => {
    getOneVolunteer(1).then((res) => { //todo get the correct volunteer ID
      // setMonday(JSON.parse(res.volunteer.availabilities)[0].time);
      monday = JSON.parse(res.volunteer.availabilities)[0].time;
    //   setTuesday(JSON.parse(res.volunteer.availabilities)[1].time);
    //   setWednesday(JSON.parse(res.volunteer.availabilities)[2].time);
    //   setThursday(JSON.parse(res.volunteer.availabilities)[3].time);
    //   setFriday(JSON.parse(res.volunteer.availabilities)[4].time);
    //   setSaturday(JSON.parse(res.volunteer.availabilities)[5].time);
    //   setSunday(JSON.parse(res.volunteer.availabilities)[6].time);
      tuesday = JSON.parse(res.volunteer.availabilities)[0].time;
      wednesday = JSON.parse(res.volunteer.availabilities)[0].time;
      thursday = JSON.parse(res.volunteer.availabilities)[0].time;
      friday = JSON.parse(res.volunteer.availabilities)[0].time;
      saturday = JSON.parse(res.volunteer.availabilities)[0].time;
      sunday = JSON.parse(res.volunteer.availabilities)[0].time;
  console.log("inside useEffect: " + monday); //todo
    });
  });
      
  console.log("Monday:" + monday); //todo
  console.log("Tuesday:" + tuesday);

  var timeError = false;
  // pass in day of week as prop, containing the accordion associated to that day
  const TimePickerAccordion = ({ dayOfWeek }: TimePickerAccordionProps) => {
    const [shouldRender, setShouldRender] = React.useState<boolean>(false);

    useEffect(() => {
      if (shouldRender) {
        setShouldRender(false);
      }
    }, [shouldRender]);


      const [flag, setFlag] = React.useState(true);
      const [flag1, setFlag1] = React.useState(true);
      const [flag2, setFlag2] = React.useState(true);
      const [flag3, setFlag3] = React.useState(true);
      const [flag4, setFlag4] = React.useState(true);
      const [flag5, setFlag5] = React.useState(true);

      const handleClick = () => {
        setFlag(false);
        setFlag1(true);
        setFlag2(true);
        setFlag3(true);
        setFlag4(true);
        setFlag5(true);
        setTimes(dayOfWeek, "12");
      };
      const handleClick1 = () => {
        setFlag(true);
        setFlag1(false);
        setFlag2(true);
        setFlag3(true);
        setFlag4(true);
        setFlag5(true);
        setTimes(dayOfWeek, "13");
      };
      const handleClick2 = () => {
        setFlag(true);
        setFlag1(true);
        setFlag2(false);
        setFlag3(true);
        setFlag4(true);
        setFlag5(true);
        setTimes(dayOfWeek, "14");
      };
      const handleClick3 = () => {
        setFlag(true);
        setFlag1(true);
        setFlag2(true);
        setFlag3(false);
        setFlag4(true);
        setFlag5(true);
        setTimes(dayOfWeek, "15");
      };
      const handleClick4 = () => {
        setFlag(true);
        setFlag1(true);
        setFlag2(true);
        setFlag3(true);
        setFlag4(false);
        setFlag5(true);
        setTimes(dayOfWeek, "16");
      };
      const handleClick5 = () => {
        setFlag(true);
        setFlag1(true);
        setFlag2(true);
        setFlag3(true);
        setFlag4(true);
        setFlag5(false);
        setTimes(dayOfWeek, "17");
      };
      
      //initialize the availabilities
    useEffect(() => {
      if (GetTimes(dayOfWeek) != "") {
        setExpanded(true)
        switch (GetTimes(dayOfWeek)) {
          case "12":
            handleClick()
            break;
          case "13":
            handleClick1()
            break;
          case "14":
            handleClick2()
            break;
          case "15":
            handleClick3()
            break;
          case "16":
            handleClick4()
            break;
          case "17":
            handleClick5()
            break;
        }
      }
    }, []);


    const SelectTime = () => {
     
      

      return (
        <LocalizationProvider>
          <Box className="time-selection-buttons">
            <Box className="col">
              <Button
                sx={{ whiteSpace: "nowrap", width: "30%" }}
                onClick={handleClick}
                variant={flag ? "outlined" : "contained"}
              >
                12 pm
              </Button>

              <Button
                sx={{ whiteSpace: "nowrap", width: "30%", ml: "5%" }}
                onClick={handleClick1}
                variant={flag1 ? "outlined" : "contained"}
              >
                1 pm
              </Button>

              <Button
                sx={{ whiteSpace: "nowrap", width: "30%", ml: "5%" }}
                onClick={handleClick2}
                variant={flag2 ? "outlined" : "contained"}
              >
                2 pm
              </Button>
            </Box>

            <Box className="col">
              <Button
                sx={{ whiteSpace: "nowrap", width: "30%" }}
                onClick={handleClick3}
                variant={flag3 ? "outlined" : "contained"}
              >
                3 pm
              </Button>

              <Button
                sx={{ whiteSpace: "nowrap", width: "30%", ml: "5%" }}
                onClick={handleClick4}
                variant={flag4 ? "outlined" : "contained"}
              >
                4 pm
              </Button>

              <Button
                sx={{ whiteSpace: "nowrap", width: "30%", ml: "5%" }}
                onClick={handleClick5}
                variant={flag5 ? "outlined" : "contained"}
              >
                5 pm
              </Button>
            </Box>
          </Box>
        </LocalizationProvider>
      );
    };

    const [disabled, setDisabled] = useState(false);
    const [expanded, setExpanded] = useState(false);

    
    const ToggleAccordionDisability = (
      event: React.ChangeEvent<HTMLInputElement>
    ) => {
      setDisabled(!event.target.checked);
      if (!event.target.checked) setExpanded(false);
    };

    const handleChange = (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded);
    };

    return (
      <Accordion
        disabled={disabled}
        expanded={expanded}
        onChange={handleChange}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            padding: "6px 8px 8px",
          }}
        >
          <Switch checked={!disabled} onChange={ToggleAccordionDisability} />
          <AccordionSummary
            expandIcon={<MdExpandMore />}
            aria-controls="panel1a-content"
            id="panel1a-header"
            sx={{ flexGrow: 1 }}
          >
            <Typography>{dayOfWeek}</Typography>
          </AccordionSummary>
        </Box>
        <AccordionDetails>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              flexDirection: "column",
              gap: 2,
            }}
          >
            <SelectTime />
          </Box>
        </AccordionDetails>
      </Accordion>
    );
  };

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    if (timeError) {
      setOpen(true);
    } else {
      console.log("go back");
      navigate(-1);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box className="center1">
      <Typography
        sx={{
          font: "Poppins",
          color: "#666666",
          fontWeight: "600",
          textAlign: "center",
          fontSize: "1.5rem",
          marginBottom: "3%",
        }}
      >
        Availability
      </Typography>

      <LocalizationProvider>
        {/* iterate through list of days of week and create accordion for each day */}
        {daysOfWeek.map((day) => {
          return <TimePickerAccordion dayOfWeek={day} />;
        })}
      </LocalizationProvider>

      <Box display="flex" justifyContent="center" mt="10%">
        <Button
          sx={{
            backgroundColor: "#33BE41",
            width: "30%",
            marginBottom: "100%",
          }}
          variant="contained"
          onClick={handleClickOpen}
        >
          Save
        </Button>
      </Box>

      <div>
        <Dialog open={open} onClose={handleClose}>
          <DialogContent>
            <Typography
              sx={{
                font: "Poppins",
                color: "#666666",
                fontWeight: "600",
                textAlign: "center",
                fontSize: "1.5rem",
                mt: "10%",
              }}
            >
              Unable to save. Start times must be before end times.
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Ok</Button>
          </DialogActions>
        </Dialog>
      </div>
    </Box>
  );
};

export default MarkAvailability;
