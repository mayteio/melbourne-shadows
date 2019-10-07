import React, { useEffect, useState } from "react";
import Map from "./common/Map";
import { Box } from "@material-ui/core";
import { useDeck } from "./useDeck";
import SunAndMoon from "./SunAndMoon";
import { useDateState, useSunTimes } from "./DateContext";
import IdleScreen from "./IdleScreen";
import { useMapRef, DEFAULT_VIEW_STATE } from "./common/MapContext";
import { setMapStyle } from "./setMapStyle";
import ChatBubbles from "./ChatBubbles";
import Header from "./common/Header";
import Branding from "./common/Branding";
import { useIdle } from "use-idle";

const { latitude, longitude } = DEFAULT_VIEW_STATE;

const MAP_STYLE =
  "mapbox://styles/gisfeedback/ck065yh57135w1crqs3gp4g3g?fresh=true";

function App() {
  const { layers, lightingRef } = useDeck();

  const [idle, setIdle] = useState(true);
  const onStart = React.useCallback(() => {
    setIdle(false);
  }, [setIdle]);

  const date = useDateState();
  const { timeOfDay } = useSunTimes({ date, latitude, longitude });
  const mapRef = useMapRef();
  window.mapRef = mapRef;
  useEffect(() => {
    setMapStyle(mapRef.current, timeOfDay);
    if (timeOfDay === "night") {
      lightingRef.current.directionalLights[0].intensity = 0;
      lightingRef.current.ambientLight.intensity = 1;
    } else {
      lightingRef.current.directionalLights[0].intensity = 1;
      lightingRef.current.ambientLight.intensity = 2;
    }
  }, [timeOfDay, mapRef, lightingRef]);

  const isIdle = useIdle({ timeToIdle: 3 * 60 * 1000 });
  useEffect(() => {
    if (isIdle) setIdle(true);
  }, [isIdle]);

  return (
    <Box display="flex" flexDirection="column" height={1}>
      <Header>
        <Branding theme="dark" />
      </Header>
      <Box position="relative" flexGrow={1}>
        <Map
          layers={layers}
          lighting={lightingRef.current}
          mapStyle={MAP_STYLE}
        />
        <SunAndMoon idle={idle} date={date} timeOfDay={timeOfDay} />
        <IdleScreen idle={idle} onStart={onStart} timeOfDay={timeOfDay} />
        <ChatBubbles idle={idle} />
      </Box>
    </Box>
  );
}

export default App;
