import React from "react";

import { generateLighting } from "./lightingEffects";
import { generateLayers, landCover } from "./layers";
import { useDateState, useSunTimes } from "./DateContext";
import { useViewstateState } from "./common/MapContext";

const lighting = generateLighting(new Date());

export function useDeck() {
  const lightingRef = React.useRef(lighting);
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

  const date = useDateState();
  const { latitude, longitude } = useViewstateState();
  const { timeOfDay } = useSunTimes({ date, latitude, longitude });
  const layers = generateLayers(data, timeOfDay);

  return { layers, lightingRef };
}
