import React, { useEffect } from "react";
import { useRef, useState } from "react";
import {
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Button,
  Alert,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import "../Styles/Availabilities.css";
import { useNavigate } from "react-router-dom";
import {
  editVolunteerAvailabilities,
  getOneVolunteer,
  editAvailabilitiesLastUpdated,
} from "../services";
import { getCurrentUserId } from "../helper";

type TimePickerAccordionProps = {
  dayOfWeek: string;
};

const MarkAvailability = () => {
  let volunteerId = getCurrentUserId();
  const daysOfWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  //use these refs to keep track of which times have been selected without having to
  //rerender each time a time is selected
  const saveMonday = useRef<string>("");
  const saveTuesday = useRef<string>("");
  const saveWednesday = useRef<string>("");
  const saveThursday = useRef<string>("");
  const saveFriday = useRef<string>("");
  const saveSaturday = useRef<string>("");
  const saveSunday = useRef<string>("");

  //if the user clicks on a time that is already selected,
  //it removes the selection
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

    //Get the current saved availabilities when the page loads
    useEffect(() => {
      if (volunteerId != null && volunteerId != undefined) {
        getOneVolunteer(parseInt(volunteerId)).then((res) => {
          //todo get the correct volunteer ID
          setMonday(JSON.parse(res.volunteer.availabilities)[0].time);
          setTuesday(JSON.parse(res.volunteer.availabilities)[1].time);
          setWednesday(JSON.parse(res.volunteer.availabilities)[2].time);
          setThursday(JSON.parse(res.volunteer.availabilities)[3].time);
          setFriday(JSON.parse(res.volunteer.availabilities)[4].time);
          setSaturday(JSON.parse(res.volunteer.availabilities)[5].time);
          setSunday(JSON.parse(res.volunteer.availabilities)[6].time);
        });
      }
    }, []);

    const TimeSelect = () => {
      const [clicked, setClicked] = React.useState(false);
      const [clicked1, setClicked1] = React.useState(false);
      const [clicked2, setClicked2] = React.useState(false);
      const [clicked3, setClicked3] = React.useState(false);
      const [clicked4, setClicked4] = React.useState(false);
      const [clicked5, setClicked5] = React.useState(false);

      function setButtonsClicked(buttonNumber: number) {
        setClicked(false);
        setClicked1(false);
        setClicked2(false);
        setClicked3(false);
        setClicked4(false);
        setClicked5(false);
        switch (buttonNumber) {
          case 0:
            setClicked(true);
            break;
          case 1:
            setClicked1(true);
            break;
          case 2:
            setClicked2(true);
            break;
          case 3:
            setClicked3(true);
            break;
          case 4:
            setClicked4(true);
            break;
          case 5:
            setClicked5(true);
            break;
        }
      }
      const handleClick = () => {
        if (clicked) {
          //if the button is clicked again to remove the time selected
          setClicked(false);
          removeSave(dayOfWeek);
        } else {
          setButtonsClicked(0);
          setTimes(dayOfWeek, "12");
        }
      };
      const handleClick1 = () => {
        if (clicked1) {
          //if the button is clicked again to remove the time selected
          setClicked1(false);
          removeSave(dayOfWeek);
        } else {
          setButtonsClicked(1);
          setTimes(dayOfWeek, "13");
        }
      };
      const handleClick2 = () => {
        if (clicked2) {
          //if the button is clicked again to remove the time selected
          setClicked2(false);
          removeSave(dayOfWeek);
        } else {
          setButtonsClicked(2);
          setTimes(dayOfWeek, "14");
        }
      };
      const handleClick3 = () => {
        if (clicked3) {
          //if the button is clicked again to remove the time selected
          setClicked3(false);
          removeSave(dayOfWeek);
        } else {
          setButtonsClicked(3);
          setTimes(dayOfWeek, "15");
        }
      };
      const handleClick4 = () => {
        if (clicked4) {
          //if the button is clicked again to remove the time selected
          setClicked4(false);
          removeSave(dayOfWeek);
        } else {
          setButtonsClicked(4);
          setTimes(dayOfWeek, "16");
        }
      };
      const handleClick5 = () => {
        if (clicked5) {
          //if the button is clicked again to remove the time selected
          setClicked5(false);
          removeSave(dayOfWeek);
        } else {
          setButtonsClicked(5);
          setTimes(dayOfWeek, "17");
        }
      };

      useEffect(() => {
        if (GetTimes(dayOfWeek) != "") {
          switch (GetTimes(dayOfWeek)) {
            case "12":
              handleClick();
              break;
            case "13":
              handleClick1();
              break;
            case "14":
              handleClick2();
              break;
            case "15":
              handleClick3();
              break;
            case "16":
              handleClick4();
              break;
            case "17":
              handleClick5();
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
                variant={clicked ? "contained" : "outlined"}
              >
                12 pm
              </Button>

              <Button
                sx={{ whiteSpace: "nowrap", width: "30%", ml: "5%" }}
                onClick={handleClick1}
                variant={clicked1 ? "contained" : "outlined"}
              >
                1 pm
              </Button>

              <Button
                sx={{ whiteSpace: "nowrap", width: "30%", ml: "5%" }}
                onClick={handleClick2}
                variant={clicked2 ? "contained" : "outlined"}
              >
                2 pm
              </Button>
            </Box>

            <Box className="col">
              <Button
                sx={{ whiteSpace: "nowrap", width: "30%" }}
                onClick={handleClick3}
                variant={clicked3 ? "contained" : "outlined"}
              >
                3 pm
              </Button>

              <Button
                sx={{ whiteSpace: "nowrap", width: "30%", ml: "5%" }}
                onClick={handleClick4}
                variant={clicked4 ? "contained" : "outlined"}
              >
                4 pm
              </Button>

              <Button
                sx={{ whiteSpace: "nowrap", width: "30%", ml: "5%" }}
                onClick={handleClick5}
                variant={clicked5 ? "contained" : "outlined"}
              >
                5 pm
              </Button>
            </Box>
          </Box>
        </LocalizationProvider>
      );
    };

    return (
      <Accordion expanded={true}>
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

  const [saveSuccess, setSaveSuccess] = useState(0);
  const save = () => {
    const avails = {
      availabilities: `[{\"day\":\"monday\",\"time\":\"${saveMonday.current}\"},{\"day\":\"tuesday\",\"time\":\"${saveTuesday.current}\"},{\"day\":\"wednesday\",\"time\":\"${saveWednesday.current}\"},{\"day\":\"thursday\",\"time\":\"${saveThursday.current}\"},{\"day\":\"friday\",\"time\":\"${saveFriday.current}\"},{\"day\":\"saturday\",\"time\":\"${saveSaturday.current}\"},{\"day\":\"sunday\",\"time\":\"${saveSunday.current}\"}]`,
    };
    const date = {
      availabilitiesLastUpdated: new Date(),
    };
    try {
      if (volunteerId != null && volunteerId != undefined) {
        editVolunteerAvailabilities(parseInt(volunteerId), avails);
        editAvailabilitiesLastUpdated(parseInt(volunteerId), date);
        setSaveSuccess(1);
        window.location.href = "/tasks"; // redirect to my deliveries page once availability is updated.
      }
    } catch (e) {
      setSaveSuccess(2);
      console.log(e);
    }
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
      {saveSuccess == 1 && (
        <Alert severity="success">Availabilities saved successfully </Alert>
      )}
      {saveSuccess == 2 && (
        <Alert severity="error">Error saving availabilities</Alert>
      )}

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
