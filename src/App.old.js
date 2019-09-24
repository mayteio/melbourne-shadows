import React from "react";

import suncalc from "suncalc";

import { Box } from "@material-ui/core";

import { generateLighting } from "./lightingEffects";
import { generateLayers, landCover } from "./layers";
import { setMapStyle } from "./setMapStyle";

import { useMapRef, DEFAULT_VIEW_STATE } from "./common/MapContext";
import Map from "./common/Map";

import Controls from "./Controls";

const MAP_STYLE =
  "mapbox://styles/gisfeedback/ck065yh57135w1crqs3gp4g3g?fresh=true";

const getTimes = date => {
  return suncalc.getTimes(
    date,
    DEFAULT_VIEW_STATE.latitude,
    DEFAULT_VIEW_STATE.longitude
  );
};

function App() {
  const [date, setDate] = React.useState(new Date());
  const lightingRef = React.useRef(generateLighting(date));
  const [timeOfDay, setTimeOfDay] = React.useState("day");
  const [times, setTimes] = React.useState(() => {
    const { sunrise, sunset } = getTimes(date);
    return { sunrise, sunset };
  });

  const mapRef = useMapRef();
  const onChange = React.useCallback(
    ({ time, date }) => {
      date.setHours(time);

      lightingRef.current.directionalLights[0].timestamp = date.getTime();
      setDate(date);

      const { sunrise, sunset } = suncalc.getTimes(
        date,
        DEFAULT_VIEW_STATE.latitude,
        DEFAULT_VIEW_STATE.longitude
      );

      setTimes({ sunrise, sunset });

      const nextTimeOfDay = date > sunrise && date < sunset ? "day" : "night";
      if (timeOfDay !== nextTimeOfDay) {
        setTimeOfDay(nextTimeOfDay);
        setMapStyle(mapRef.current, nextTimeOfDay);
        lightingRef.current.ambientLight.intensity =
          nextTimeOfDay === "day" ? 5 : 1;
      }
    },
    [mapRef, timeOfDay]
  );

  const [data, setData] = React.useState();
  React.useEffect(() => {
    const getData = async () => {
      const res = await fetch(
        "https://city-dna.s3-ap-southeast-2.amazonaws.com/building_footprints.json"
      ).then(res => res.json());
      res.features.push(landCover);
      setData(res);
    };
    getData();
  }, []);

  const layers = generateLayers(times, date, data);

  return (
    <Box display="flex" flexDirection="column" height={1}>
      <Box position="relative" flexGrow={1}>
        <Map
          layers={layers}
          lighting={lightingRef.current}
          mapStyle={MAP_STYLE}
        />
      </Box>
    </Box>
  );
}

export default App;
