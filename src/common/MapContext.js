import React from "react";

const ViewstateStateContext = React.createContext();
const ViewstateDispatchContext = React.createContext();

const MapRefContext = React.createContext();

/**
 * Provides both the state and the dispatcher to the app.
 * @param {object} props Component props
 */
export function MapProvider({
  defaultViewstate = DEFAULT_VIEW_STATE,
  children
}) {
  const [viewstate, setViewstate] = React.useState(defaultViewstate);
  const mapRef = React.useRef();
  return (
    <ViewstateStateContext.Provider value={viewstate}>
      <ViewstateDispatchContext.Provider value={setViewstate}>
        <MapRefContext.Provider value={mapRef}>
          {children}
        </MapRefContext.Provider>
      </ViewstateDispatchContext.Provider>
    </ViewstateStateContext.Provider>
  );
}

export const DEFAULT_VIEW_STATE = {
  latitude: -37.8136,
  longitude: 144.96332,
  zoom: 14,
  pitch: 40,
  bearing: 0
};

export function useMapRef() {
  const context = React.useContext(MapRefContext);
  if (context === undefined)
    throw new Error("useMapRef() must be used within a <MapProvider />");
  return context;
}

/**
 * Returns the current state.
 */
export function useViewstateState() {
  const context = React.useContext(ViewstateStateContext);
  if (context === undefined)
    throw new Error(
      "useViewstateState() must be used within a <MapProvider />"
    );
  return context;
}

/**
 * Returns the context
 */
export function useViewstateDispatch() {
  const context = React.useContext(ViewstateDispatchContext);
  if (context === undefined)
    throw new Error(
      "useViewstateDispatch() must be used within a <MapProvider />"
    );
  return context;
}

/**
 * Nicer abstraction. We use this setup so the entire
 * app doesn't re-render when the viewstate changes
 * (which is every frame during transitions).
 * @example
 * const [viewstate, setViewstate] = useViewstate();
 */
export function useViewstate() {
  return [useViewstateState(), useViewstateDispatch()];
}
