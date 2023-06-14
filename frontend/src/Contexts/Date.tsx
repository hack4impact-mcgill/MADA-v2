import React from "react";
import { createContext, useState } from "react";

// create a type for DateContext
export type DateContextType = {
  dateFilter: string;
  setDateFilter: React.Dispatch<React.SetStateAction<string>>;
};

// create a DateContext of type DateContextType or null.
export const DateContext = createContext<DateContextType | null>(null);

export const DateProvider = (props: { children: React.ReactNode }) => {
  const [dateFilter, setDateFilter] = useState(
    new Date().toLocaleString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    })
  );

  return (
    <>
      {/* Anything passed into value can be used by the children of this Provider */}
      <DateContext.Provider
        value={{ dateFilter, setDateFilter }}
      >
        {props.children}
      </DateContext.Provider>
    </>
  );
};
