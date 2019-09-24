import React, { useEffect, useState } from "react";
import Map from "./common/Map";
import { Box } from "@material-ui/core";
import { useDeck } from "./useDeck";
import SunAndMoon from "./SunAndMoon";
import { useDateState, useSunTimes } from "./DateContext";
import IdleScreen from "./IdleScreen";
import { useMapRef, DEFAULT_VIEW_STATE } from "./common/MapContext";
import { setMapStyle } from "./setMapStyle";

const { latitude, longitude } = DEFAULT_VIEW_STATE;

const MAP_STYLE =
  "mapbox://styles/gisfeedback/ck065yh57135w1crqs3gp4g3g?fresh=true";

function App() {
  const { layers, lightingRef } = useDeck();

  const [idle, setIdle] = useState(true);
  const onStart = () => {
    setIdle(false);
  };

  const date = useDateState();
  const { timeOfDay } = useSunTimes({ date, latitude, longitude });
  const mapRef = useMapRef();
  useEffect(() => {
    setMapStyle(mapRef.current, timeOfDay);
  }, [timeOfDay, mapRef]);

  return (
    <Box display="flex" flexDirection="column" height={1}>
      <Box position="relative" flexGrow={1}>
        <Map
          layers={layers}
          lighting={lightingRef.current}
          mapStyle={MAP_STYLE}
        />
        <SunAndMoon idle={idle} date={date} />
        <IdleScreen idle={idle} onStart={onStart} />
      </Box>
    </Box>
  );
}

export default App;
