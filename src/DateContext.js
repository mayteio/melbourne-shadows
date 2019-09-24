import React, { useContext, useState, createContext } from "react";
import suncalc from "suncalc";
import { subHours } from "date-fns/esm";

const DateStateContext = createContext();
const DateUpdateContext = createContext();

export function DateProvider(props) {
  const [date, setDate] = useState(new Date(2019, 6, 22, 14));

  return (
    <DateStateContext.Provider value={date}>
      <DateUpdateContext.Provider value={setDate}>
        {props.children}
      </DateUpdateContext.Provider>
    </DateStateContext.Provider>
  );
}

export function useDateState() {
  const date = useContext(DateStateContext);
  return date;
}

export function useDateUpdate() {
  const setDate = useContext(DateUpdateContext);
  return setDate;
}

export function useSunTimes({ date, latitude, longitude }) {
  const { sunrise, sunset } = suncalc.getTimes(date, latitude, longitude);

  const timeOfDay =
    date > sunrise && date < subHours(sunset, 0.9) ? "day" : "night";
  return { timeOfDay, sunrise, sunset };
}
