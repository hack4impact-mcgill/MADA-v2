import React, { useEffect } from "react";
import { useState } from "react";
import { Dayjs } from "dayjs";
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
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MdExpandMore } from "react-icons/md";
import "../Styles/Availabilities.css";

type TimePickerAccordionProps = {
  dayOfWeek: string;
};
type TimeRange = {
  startTime: Dayjs | null;
  endTime: Dayjs | null;
};

const MarkAvailability = () => {
  const [monday, setMonday] = useState<TimeRange[]>([
    {
      startTime: null,
      endTime: null,
    },
  ]);
  const [tuesday, setTuesday] = useState<TimeRange[]>([
    {
      startTime: null,
      endTime: null,
    },
  ]);
  const [wednesday, setWednesday] = useState<TimeRange[]>([
    {
      startTime: null,
      endTime: null,
    },
  ]);
  const [thursday, setThursday] = useState<TimeRange[]>([
    {
      startTime: null,
      endTime: null,
    },
  ]);
  const [friday, setFriday] = useState<TimeRange[]>([
    {
      startTime: null,
      endTime: null,
    },
  ]);
  const [saturday, setSaturday] = useState<TimeRange[]>([
    {
      startTime: null,
      endTime: null,
    },
  ]);
  const [sunday, setSunday] = useState<TimeRange[]>([
    {
      startTime: null,
      endTime: null,
    },
  ]);

  const daysOfWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  function setTimes(dayOfWeek: string, time: TimeRange[]) {
    switch (dayOfWeek) {
      case "Monday":
        setMonday(time);
        break;
      case "Tuesday":
        setTuesday(time);
        break;
      case "Wednesday":
        setWednesday(time);
        break;
      case "Thursday":
        setThursday(time);
        break;
      case "Friday":
        setFriday(time);
        break;
      case "Saturday":
        setSaturday(time);
        break;
      case "Sunday":
        setSunday(time);
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

  var timeError = false;
  // pass in day of week as prop, containing the accordion associated to that day
  const TimePickerAccordion = ({ dayOfWeek }: TimePickerAccordionProps) => {
    const [shouldRender, setShouldRender] = React.useState<boolean>(false);

    useEffect(() => {
      if (shouldRender) {
        setShouldRender(false);
      }
    }, [shouldRender]);

    // contains a pair of time pickers, and the icons associated to them
    const TimeRange = ({ index }: { index: number }) => {
     
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
      };
      const handleClick1 = () => {
        setFlag(true);
        setFlag1(false);
        setFlag2(true);
        setFlag3(true);
        setFlag4(true);
        setFlag5(true);
      };
      const handleClick2 = () => {
        setFlag(true);
        setFlag1(true);
        setFlag2(false);
        setFlag3(true);
        setFlag4(true);
        setFlag5(true);
      };
      const handleClick3 = () => {
        setFlag(true);
        setFlag1(true);
        setFlag2(true);
        setFlag3(false);
        setFlag4(true);
        setFlag5(true);
      };
      const handleClick4 = () => {
        setFlag(true);
        setFlag1(true);
        setFlag2(true);
        setFlag3(true);
        setFlag4(false);
        setFlag5(true);
      };
      const handleClick5 = () => {
        setFlag(true);
        setFlag1(true);
        setFlag2(true);
        setFlag3(true);
        setFlag4(true);
        setFlag5(false);
      };
      return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
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
            {GetTimes(dayOfWeek).map((day, i) => {
              return <TimeRange index={i} />;
            })}
          </Box>
        </AccordionDetails>
      </Accordion>
    );
  };

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    if (timeError) {
      setOpen(true);
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

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        {/* iterate through list of days of week and create accordion for each day */}
        {daysOfWeek.map((day) => {
          return <TimePickerAccordion dayOfWeek={day} />;
        })}
      </LocalizationProvider>

      <Box display="flex" justifyContent="center" mt="10%">
        <Button
          sx={{ backgroundColor: "#33BE41", width: "30%" }}
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
