import React from "react";
import { useState } from "react";
import { Dayjs } from "dayjs";
import {
  Stack,
  TextField,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Switch,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { ExpandMore, FormatAlignJustify } from "@mui/icons-material";

type TimePickerAccordionProps = {
  prop: string;
  setTime: (dayOfWeek: string, time: Dayjs) => void;
  dayOfWeek: string;
};

// pass in day of week as prop
const TimePickerAccordion = ({
  prop,
  setTime,
  dayOfWeek,
}: TimePickerAccordionProps) => {
  return (
    <Accordion id={prop}>
      <Stack
        direction="row"
        sx={{
          alignItems: "center",
        }}
      >
        <Switch />
        <AccordionSummary
          expandIcon={<ExpandMore />}
          aria-controls="panel1a-content"
          id="panel1a-header"
          sx={{ flexGrow: 1 }}
        >
          <Typography>{prop}</Typography>
        </AccordionSummary>
      </Stack>
      <AccordionDetails>
        <Typography>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
          malesuada lacus ex, sit amet blandit leo lobortis eget.
        </Typography>
      </AccordionDetails>
    </Accordion>
  );
};

const MarkAvailability = () => {
  const [startDate, setStartDate] = useState<Dayjs | null>(null);
  const [endDate, setEndDate] = useState<Dayjs | null>(null);
  const [monday, setMonday] = useState<Array<Dayjs>>([]);
  const [tuesday, setTuesday] = useState<Array<Dayjs>>([]);
  const [wednesday, setWednesday] = useState<Array<Dayjs>>([]);
  const [thursday, setThursday] = useState<Array<Dayjs>>([]);
  const [friday, setFriday] = useState<Array<Dayjs>>([]);
  const [saturday, setSaturday] = useState<Array<Dayjs>>([]);
  const [sunday, setSunday] = useState<Array<Dayjs>>([]);
  const daysOfWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  function setTime(dayOfWeek: string, time: Dayjs) {
    switch (dayOfWeek) {
      case "Monday":
        setMonday([...monday, time]);
        break;
      case "Tuesday":
        setTuesday([...tuesday, time]);
        break;
      case "Wednesday":
        setWednesday([...wednesday, time]);
        break;
      case "Thursday":
        setThursday([...thursday, time]);
        break;
      case "Friday":
        setFriday([...friday, time]);
        break;
      case "Saturday":
        setSaturday([...saturday, time]);
        break;
      case "Sunday":
        setSunday([...sunday, time]);
        break;
    }
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Stack id="date-range" direction="row">
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
      </Stack>

      {/* iterate through list of days of week and create accordion for each day */}
      {daysOfWeek.map((day) => {
        return (
          <TimePickerAccordion prop={day} setTime={setTime} dayOfWeek={day} />
        );
      })}
    </LocalizationProvider>
  );
};

export default MarkAvailability;
