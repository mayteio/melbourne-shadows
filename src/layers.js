import { GeoJsonLayer } from "@deck.gl/layers";
import { material } from "./lightingEffects";

export const landCover = {
  type: "Feature",
  geometry: {
    type: "Polygon",
    coordinates: [
      [
        [144.89919662475583, -37.884337889841234],
        [145.02262115478516, -37.884337889841234],
        [145.02262115478516, -37.76080849651723],
        [144.89919662475583, -37.76080849651723],
        [144.89919662475583, -37.884337889841234]
      ]
    ]
  },
  properties: {
    isFloor: true,
    footprint_extrusion: 0
  }
};

export const generateLayers = (data, timeOfDay) => {
  return [
    new GeoJsonLayer({
      id: "buildings",
      data,
      extruded: true,
      wireframe: false,
      opacity: 1,
      getElevation: f => f.properties.footprint_extrusion,
      getFillColor: d => {
        if (d.properties.isFloor) return [0, 0, 0, 0];
        return timeOfDay === "day" ? [255, 255, 255] : [74, 80, 87];
      },
      material,
      _shadows: timeOfDay === "day"
    })
  ];
};
