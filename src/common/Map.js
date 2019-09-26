import React from "react";
import { useViewstate, useMapRef } from "./MapContext";
import DeckGL from "@deck.gl/react";
import { StaticMap } from "react-map-gl";
import { MapboxLayer } from "@deck.gl/mapbox";
import "mapbox-gl/dist/mapbox-gl.css";

export default function Map({ layers, lighting, mapStyle, children }) {
  const [viewstate, setViewstate] = useViewstate();

  const bounds = [
    [144.9, -37.85], // Southwest coordinates
    [144.99, -37.78] // Northeast coordinates
  ];
  const setViewStateInBounds = vsFn => {
    setViewstate(vs => {
      /**
       * Can pass either a function or an object. You'd
       * pass a function to get access to the previous
       * viewState.
       */
      const nextViewState = typeof vsFn === "function" ? vsFn(vs) : vsFn;
      if (bounds) {
        let { latitude, longitude, ...rest } = nextViewState;
        const [
          [minLongitude, minLatitude],
          [maxLongitude, maxLatitude]
        ] = bounds;

        if (latitude < minLatitude) {
          latitude = minLatitude;
        } else if (latitude > maxLatitude) {
          latitude = maxLatitude;
        }

        if (longitude < minLongitude) {
          longitude = minLongitude;
        } else if (longitude > maxLongitude) {
          longitude = maxLongitude;
        }

        return {
          ...vs,
          ...rest,
          latitude,
          longitude
        };
      } else {
        return nextViewState;
      }
    });
  };

  const mapRef = useMapRef();
  const deckRef = React.useRef();

  const [gl, setGl] = React.useState();
  const onLoad = () =>
    layers.forEach(layer =>
      mapRef.current.addLayer(
        new MapboxLayer({ id: layer.id, deck: deckRef.current }),
        "place-suburb"
      )
    );
  return (
    <DeckGL
      layers={layers}
      effects={[lighting]}
      controller={{ touchRotate: true, minZoom: 14 }}
      viewState={viewstate}
      onViewStateChange={v => setViewStateInBounds(v.viewState)}
      ref={ref => (deckRef.current = ref && ref.deck)}
      onWebGLInitialized={gl => gl && setGl(gl)}
    >
      <StaticMap
        reuseMaps
        mapStyle={mapStyle}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_API_ACCESS_TOKEN}
        ref={ref => (mapRef.current = ref && ref.getMap())}
        gl={gl}
        onLoad={onLoad}
      >
        {children}
      </StaticMap>
    </DeckGL>
  );
}
