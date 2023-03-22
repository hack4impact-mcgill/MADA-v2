import { Typography } from "@mui/material";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";

export function NoDeliveries() {
  return (
    <Typography textAlign={'center'}>
      <Typography sx={{ color: "#666666", marginTop: "15%" }}>
        Congratulations!
      </Typography>
      <Typography sx={{ color: "#666666", marginBottom: "15%"}}>
        You're all done for today!
      </Typography>
    </Typography>
  );
}

function timelineItems(name: String, time: String, last: Boolean, done: Boolean) {
    return (
      <TimelineItem
        sx={{ [`& .${timelineItems}:before`]: {flex: 0, padding: 0 },}}// remove padding from the timeline items
      >
        <TimelineSeparator>
          <TimelineDot sx={{ backgroundColor: done ? "#33BE41" : "#ffffff", borderColor: done ? "#33BE41" : "#aaaaaa " }} />
          {!last && <TimelineConnector />}
        </TimelineSeparator>

        <TimelineContent>
          <Typography
            sx={{ color: "#666666", fontWeight: "bold" }}
            variant="body2"
          >
            {name}
          </Typography>
          <Typography sx={{ color: "#666666" }} variant="body2">
            {time}
          </Typography>
        </TimelineContent>
      </TimelineItem>
    );
}

export function DeliveryTimeline() {
  let testDeliveryData = [
    { "name": "Leopold Bennett", "Time": "8:00 AM - 9:00 AM", "isLast": false, "done": true },
    { "name": "Samuel Ranch", "Time": "11:30 AM - 12:30 PM", "isLast": false, "done": false },
    { "name": "Zahara Lott", "Time": "3:00 PM - 4:00 PM", "isLast": true, "done": false },
  ];  
  const items = [];
  for (let i = 0; i < testDeliveryData.length; i++) {
      items.push(timelineItems(testDeliveryData[i].name, testDeliveryData[i].Time, testDeliveryData[i].isLast, testDeliveryData[i].done))
  }
  return (
    <Timeline className="timeline">
      {items}
    </Timeline>
  );
}
