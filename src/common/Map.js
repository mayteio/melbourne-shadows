import React from "react";
import { useViewstate, useMapRef } from "./MapContext";
import DeckGL from "@deck.gl/react";
import { StaticMap } from "react-map-gl";
import { MapboxLayer } from "@deck.gl/mapbox";
import "mapbox-gl/dist/mapbox-gl.css";

export default function Map({ layers, lighting, mapStyle, children }) {
  const [viewstate, setViewstate] = useViewstate();

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
      controller={{ touchRotate: true }}
      viewState={viewstate}
      onViewStateChange={v => setViewstate(v.viewState)}
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
