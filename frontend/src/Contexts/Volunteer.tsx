import React from "react";

export enum DayOfWeek {
  MONDAY = "monday",
  TUESDAY = "tuesday",
  WEDNESDAY = "wednesday",
  THURSDAY = "thursday",
  FRIDAY = "friday",
  SATURDAY = "saturday",
  SUNDAY = "sunday",
}

export enum TimeSlots {
  hour0 = "12",
  hour1 = "13",
  hour2 = "14",
  hour3 = "15",
  hour4 = "16",
  hour5 = "17",
}

export interface Availability {
  day: DayOfWeek;
  time: TimeSlots;
}

export interface Availabilities {
  availabilities: Availability[];
}

export interface Volunteer {
  id: number;
  name: string;
  email: string;
  phone: string;
  availabilities: Availabilities;
}
