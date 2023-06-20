import { TaskInterface } from "./Tasks";

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
  hour0 = "12:00PM",
  hour1 = "01:00PM",
  hour2 = "02:00PM",
  hour3 = "03:00PM",
  hour4 = "04:00PM",
  hour5 = "05:00PM",
}

export interface Availability {
  day: DayOfWeek;
  time: TimeSlots;
}

export interface Availabilities {
  availabilities: Availability[];
}

export interface Volunteer {
  availabilities: Availabilities[];
  email: string;
  id: number;
  name: string;
  password: string;
  phoneNumber: string;
  profilePicture: string;
  startDate: Date;
  token: string;
}
