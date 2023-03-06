import React, { useEffect } from "react";
import { useState } from "react";
import { Dayjs } from "dayjs";
import {
  Box,
  TextField,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Switch,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import { MdDeleteOutline, MdExpandMore } from "react-icons/md";
import { IoIosAddCircleOutline } from "react-icons/io";

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

  // pass in day of week as prop, containing the accordion associated to that day
  const TimePickerAccordion = ({ dayOfWeek }: TimePickerAccordionProps) => {
    const [shouldRender, setShouldRender] = React.useState<boolean>(false);

    useEffect(() => {
      console.log("hellooo");
      if (shouldRender) {
        setShouldRender(false);
      }
    }, [shouldRender]);
    // contains a pair of time pickers, and the icons associated to them
    const TimeRange = ({ index }: { index: number }) => {
      const [startTime, setStartTime] = React.useState<Dayjs | null>(
        GetTimes(dayOfWeek)[index].startTime
      );
      const [endTime, setEndTime] = React.useState<Dayjs | null>(
        GetTimes(dayOfWeek)[index].endTime
      );

      return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <TimePicker
              label="Start time"
              value={startTime}
              onChange={(startTime) => {
                var tmp: TimeRange[] = GetTimes(dayOfWeek);
                tmp[index].startTime = startTime;
                setTimes(dayOfWeek, tmp);
                setStartTime(startTime);
              }}
              renderInput={(params) => <TextField {...params} />}
            />
            <TimePicker
              label="End time"
              value={endTime}
              onChange={(endTime) => {
                var tmp: TimeRange[] = GetTimes(dayOfWeek);
                tmp[index].endTime = endTime;
                setTimes(dayOfWeek, tmp);
                setEndTime(endTime);
              }}
              renderInput={(params) => <TextField {...params} />}
            />
            {/* delete button */}
            <MdDeleteOutline
              size="40"
              onClick={() => {
                var tmp: TimeRange[] = GetTimes(dayOfWeek);
                if (tmp.length == 1) {
                  tmp[0].startTime = null;
                  tmp[0].endTime = null;
                } else {
                  tmp.splice(index, 1);
                }
                setTimes(dayOfWeek, tmp);
                setStartTime(null);
                setEndTime(null);
                setShouldRender(true);
              }}
            />
            {/* add button  if it's the last element*/}
            <IoIosAddCircleOutline
              size="40"
              visibility={
                index == GetTimes(dayOfWeek).length - 1 ? "visible" : "hidden"
              }
              onClick={() => {
                var tmp: TimeRange[] = GetTimes(dayOfWeek);
                tmp.push({
                  startTime: null,
                  endTime: null,
                });
                setTimes(dayOfWeek, tmp);
                setShouldRender(true);
              }}
            />
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
      console.log("hiii");
      if (!event.target.checked) setExpanded(false);
    };

    const handleChange = (event: React.SyntheticEvent, isExpanded: boolean) => {
      console.log("hello");
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

  const DateRangerPicker = () => {
    const [startDate, setStartDate] = useState<Dayjs | null>(null);
    const [endDate, setEndDate] = useState<Dayjs | null>(null);
    return (
      <>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <DatePicker
            label="Start Date"
            value={startDate}
            onChange={(newValue) => {
              setStartDate(newValue);
            }}
            renderInput={(params) => <TextField {...params} />}
          />

          <DatePicker
            label="End Date"
            value={endDate}
            onChange={(newValue) => {
              setEndDate(newValue);
            }}
            renderInput={(params) => <TextField {...params} />}
          />
        </Box>
      </>
    );
  };
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateRangerPicker></DateRangerPicker>
      {/* iterate through list of days of week and create accordion for each day */}
      {daysOfWeek.map((day) => {
        return <TimePickerAccordion dayOfWeek={day} />;
      })}
    </LocalizationProvider>
  );
};

export default MarkAvailability;
