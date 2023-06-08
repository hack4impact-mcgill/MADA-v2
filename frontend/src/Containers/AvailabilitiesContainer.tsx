import React, { useEffect } from "react";
import { useRef, useState } from "react";
import {
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Button,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import "../Styles/Availabilities.css";
import { useNavigate } from "react-router-dom";
import { editVolunteerAvailabilities, getOneVolunteer } from "../services";
import { Availability, TimeSlots, DayOfWeek } from "../Contexts/Volunteer";

type TimePickerAccordionProps = {
  dayOfWeek: string;
};

const MarkAvailability = () => {
  const navigate = useNavigate();

  const daysOfWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const saveMonday = useRef<string>("");
  const saveTuesday= useRef<string>("");
  const saveWednesday= useRef<string>("");
  const saveThursday = useRef<string>("");
  const saveFriday = useRef<string>("");
  const saveSaturday = useRef<string>("");
  const saveSunday = useRef<string>("");
  
  function removeSave(dayOfWeek: string) {
    switch (dayOfWeek) {
      case "Monday":
        saveMonday.current = "";
        break;
      case "Tuesday":
        saveTuesday.current = "";
        break;
      case "Wednesday":
        saveWednesday.current = "";
        break;
      case "Thursday":
        saveThursday.current = "";
        break;
      case "Friday":
        saveFriday.current = "";
        break;
      case "Saturday":
        saveSaturday.current = "";
        break;
      case "Sunday":
        saveSunday.current = "";
        break;
    }
  }
  
  // pass in day of week as prop, containing the accordion associated to that day
  const TimePickerAccordion = ({ dayOfWeek }: TimePickerAccordionProps) => {
    
    const [monday, setMonday] = useState<string>();
    const [tuesday, setTuesday] = useState<string>();
    const [wednesday, setWednesday] = useState<string>();
    const [thursday, setThursday] = useState<string>();
    const [friday, setFriday] = useState<string>();
    const [saturday, setSaturday] = useState<string>();
    const [sunday, setSunday] = useState<string>();
   
    function setTimes(dayOfWeek: string, time: string) {
      switch (dayOfWeek) {
        case "Monday":
          setMonday(time);
          saveMonday.current = time;
          break;
        case "Tuesday":
          setTuesday(time);
          saveTuesday.current = time;
          break;
        case "Wednesday":
          setWednesday(time);
          saveWednesday.current = time;
          break;
        case "Thursday":
          setThursday(time);
          saveThursday.current = time;
          break;
        case "Friday":
          setFriday(time);
          saveFriday.current = time;
          break;
        case "Saturday":
          setSaturday(time);
          saveSaturday.current = time;
          break;
        case "Sunday":
          setSunday(time);
          saveSunday.current = time;
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
        setMonday(JSON.parse(res.volunteer.availabilities)[0].time);
        setTuesday(JSON.parse(res.volunteer.availabilities)[1].time);
        setWednesday(JSON.parse(res.volunteer.availabilities)[2].time);
        setThursday(JSON.parse(res.volunteer.availabilities)[3].time);
        setFriday(JSON.parse(res.volunteer.availabilities)[4].time);
        setSaturday(JSON.parse(res.volunteer.availabilities)[5].time);
        setSunday(JSON.parse(res.volunteer.availabilities)[6].time);
      });
    }, []); 

    const TimeSelect = () => {
       
      const [flag, setFlag] = React.useState(true);
      const [flag1, setFlag1] = React.useState(true);
      const [flag2, setFlag2] = React.useState(true);
      const [flag3, setFlag3] = React.useState(true);
      const [flag4, setFlag4] = React.useState(true);
      const [flag5, setFlag5] = React.useState(true);

      const handleClick = () => {
        if (!flag) { //if the button is clicked again to remove the time selected
          setFlag(true);
          removeSave(dayOfWeek);
        }
        else {
          setFlag(false);
          setFlag1(true);
          setFlag2(true);
          setFlag3(true);
          setFlag4(true);
          setFlag5(true);
          setTimes(dayOfWeek, "12");
        }
      };
      const handleClick1 = () => {
        if (!flag1) { //if the button is clicked again to remove the time selected
          setFlag1(true);
          removeSave(dayOfWeek);
        }
        else {
          setFlag(true);
          setFlag1(false);
          setFlag2(true);
          setFlag3(true);
          setFlag4(true);
          setFlag5(true);
          setTimes(dayOfWeek, "13");
        }
      };
      const handleClick2 = () => {
        if (!flag2) { //if the button is clicked again to remove the time selected
          setFlag2(true);
          removeSave(dayOfWeek);
        }
        else {
          setFlag(true);
          setFlag1(true);
          setFlag2(false);
          setFlag3(true);
          setFlag4(true);
          setFlag5(true);
          setTimes(dayOfWeek, "14");
        }
      };
      const handleClick3 = () => {
        if (!flag3) { //if the button is clicked again to remove the time selected
          setFlag3(true);
          removeSave(dayOfWeek);
        }
        else {
          setFlag(true);
          setFlag1(true);
          setFlag2(true);
          setFlag3(false);
          setFlag4(true);
          setFlag5(true);
          setTimes(dayOfWeek, "15");
        }
      };
      const handleClick4 = () => {
        if (!flag4) { //if the button is clicked again to remove the time selected
          setFlag4(true);
          removeSave(dayOfWeek);
        }
        else {
          setFlag(true);
          setFlag1(true);
          setFlag2(true);
          setFlag3(true);
          setFlag4(false);
          setFlag5(true);
          setTimes(dayOfWeek, "16");
        }
      };
      const handleClick5 = () => {
        if (!flag5) { //if the button is clicked again to remove the time selected
          setFlag5(true);
          removeSave(dayOfWeek);
        }
        else {
          setFlag(true);
          setFlag1(true);
          setFlag2(true);
          setFlag3(true);
          setFlag4(true);
          setFlag5(false);
          setTimes(dayOfWeek, "17");
        }
      };
      
      //initialize the availabilities
    useEffect(() => {
      if (GetTimes(dayOfWeek) != "") {
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
          default:
            break;
        }
      }
    }, []);

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

    return (
      <Accordion
        expanded={true}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            padding: "6px 8px 8px",
          }}
        >
          <AccordionSummary
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
            <TimeSelect />
          </Box>
        </AccordionDetails>
      </Accordion>
    );
  };
  
  const save = () => {
    const avails = {
    "availabilities": `[{\"day\":\"monday\",\"time\":\"${saveMonday.current}\"},{\"day\":\"tuesday\",\"time\":\"${saveTuesday.current}\"},{\"day\":\"wednesday\",\"time\":\"${saveWednesday.current}\"},{\"day\":\"thursday\",\"time\":\"${saveThursday.current}\"},{\"day\":\"friday\",\"time\":\"${saveFriday.current}\"},{\"day\":\"saturday\",\"time\":\"${saveSaturday.current}\"},{\"day\":\"sunday\",\"time\":\"${saveSunday.current}\"}]`
    }
    editVolunteerAvailabilities(1, avails) //todo
 }
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
          onClick={save}
        >
          Save
        </Button>
      </Box>
    </Box>
  );
};

export default MarkAvailability;
//todo clicking on a time removes it