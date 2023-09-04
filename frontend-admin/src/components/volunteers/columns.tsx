import React from "react";
import { GridColDef } from "@mui/x-data-grid";
import * as dayjs from "dayjs";

function getDate(params: any) {
  if (params.row.startDate === null) return "";
  return `${dayjs(params.row.startDate).format("MM/DD/YYYY")}`;
}

function getArray(params: any) {
  if (!params.row.preferredNeighbourhoods) return "";
  return `${params.row.preferredNeighbourhoods.join(", ")}`;
}

export const volunteerColumns: GridColDef[] = [
  {
    field: "id",
    type: "number",
    width: 20,
  },
  {
    field: "name",
    headerName: "Name",
    type: "string",
    width: 150,
    sortable: true,
  },
  {
    field: "email",
    headerName: "Email",
    type: "string",
    width: 250,
  },
  {
    field: "phoneNumber",
    headerName: "Phone",
    type: "string",
    width: 200,
  },
  {
    field: "startDate",
    headerName: "Start Date",
    type: "string",
    valueGetter: getDate,
    width: 100,
  },
  {
    field: "perferredNeightbourhood",
    headerName: "Preferred Neighbourhood",
    type: "string",
    valueGetter: getArray,
    width: 300,
  },
];
