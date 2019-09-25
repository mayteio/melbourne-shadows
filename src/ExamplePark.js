import React, { useEffect } from "react";
import { useViewstateDispatch } from "./common/MapContext";
import { FlyToInterpolator } from "react-map-gl";
import { Box, Slider, Typography } from "@material-ui/core";
import { useDateState, useDateUpdate } from "./DateContext";
import { useDeck } from "./useDeck";
import { useAnimationFrame } from "./useAnimationFrame";
import { closestTo, addHours, addDays, setHours, setMinutes } from "date-fns";

const MIN = new Date(2019, 6, 22, 10).getTime();
const MAX = new Date(2019, 6, 22, 15).getTime();
const HOUR = 1000 * 60 * 60;
const addHoursN = (time, num) => time + num * HOUR;

export default function ExamplePark({ viewport }) {
  const setViewstate = useViewstateDispatch();
  const setDate = useDateUpdate();
  useEffect(() => {
    setTimeout(() => {
      setViewstate(vs => ({
        ...vs,
        ...viewport,
        transitionInterpolator: new FlyToInterpolator(),
        transitionDuration: 2500
      }));
    }, 500);
    return () => {};
  }, [setViewstate, setDate, viewport]);

  const date = useDateState();
  const { lightingRef } = useDeck();

  // wind to the closest 10am
  const [aligning, setAligning] = React.useState(false);
  const [target, setTarget] = React.useState();
  const [direction, setDirection] = React.useState();
  const [minmax, setMinmax] = React.useState([MIN, MAX]);
  useEffect(() => {
    if (target && direction) return;

    // find the target date
    const t = closestTo(date, [
      setHours(setMinutes(date, 0), 10),
      setHours(setMinutes(addDays(date, 1), 0), 10)
    ]);
    setTarget(t);
    setMinmax([t.getTime(), addHours(t, 5).getTime()]);

    const d = t < date ? "reverse" : "forward";
    setDirection(d);

    setTimeout(() => {
      setAligning(true);
    }, 3000);
  }, [date, direction, target]);

  // animated to the closest 10am
  useAnimationFrame(() => {
    const timestamp = date.getTime();
    const t = target.getTime();
    const next =
      direction === "reverse" ? timestamp - 600000 : timestamp + 600000;

    if (
      (direction === "reverse" && next < t) ||
      (direction === "forward" && next > t)
    ) {
      setAligning(false);
      setDate(new Date(t));
      lightingRef.current.directionalLights[0].timestamp = t;
    } else {
      lightingRef.current.directionalLights[0].timestamp = next;
      setDate(new Date(next));
    }
  }, aligning);

  const onChange = (e, value) => {
    const timestamp = date.getTime();
    lightingRef.current.directionalLights[0].timestamp = timestamp;
    setDate(new Date(value));
  };

  const marks = ([min, max]) => [
    { value: min, label: "10am" },
    { value: addHoursN(min, 1), label: "11am" },
    { value: addHoursN(min, 2), label: "12pm" },
    { value: addHoursN(min, 3), label: "1pm" },
    { value: addHoursN(min, 4), label: "2pm" },
    { value: max, label: "3pm" }
  ];

  return (
    <Box width={320}>
      <Typography variant="body2">
        Change the time of day to see how the shadow falls on the park during
        winter.
      </Typography>
      <Box pl={2} pr={2}>
        <Slider
          min={minmax[0]}
          max={minmax[1]}
          marks={marks(minmax)}
          step={60000}
          value={date.getTime()}
          onChange={onChange}
        />
      </Box>
    </Box>
  );
}
