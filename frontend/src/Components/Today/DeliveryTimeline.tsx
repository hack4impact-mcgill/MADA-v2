import { Typography } from "@mui/material";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import { getOneTask } from "../../services";
import { useState, useEffect } from "react";

export function NoDeliveries() {
  return (
    <Typography textAlign={'center'}>
      <Typography sx={{ color: "#666666", marginTop: "15%" }}>
        No deliveries for today.
      </Typography>
      <Typography sx={{ color: "#666666", marginBottom: "15%"}}>
        Check back tomorrow!
      </Typography>
    </Typography>
  );
}

function timelineItems(name: String, time: String, done: Boolean) {
    return (
      <TimelineItem
        sx={{ [`& .${timelineItems}:before`]: {flex: 0, padding: 0 },}}// remove padding from the timeline items
      >
        <TimelineSeparator>
          <TimelineDot sx={{ backgroundColor: done ? "#33BE41" : "#ffffff", borderColor: done ? "#33BE41" : "#aaaaaa " }} />
          <TimelineConnector />
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

export function DeliveryTimeline(props: { taskId: number; }) {
  const [deliveryData, setDeliveryData] = useState([]);
  useEffect(() => {
    if (props.taskId != -1) {
    getOneTask(props.taskId).then((res) => { 
      setDeliveryData(res.task.deliveries.map((delivery: any) => timelineItems(delivery.client.name, delivery.client.address, delivery.isCompleted)));
    });
  }
  }, [props.taskId])

  return (
    <Timeline className="timeline">
      {deliveryData}
    </Timeline>
  );
}