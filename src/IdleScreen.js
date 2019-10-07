import React from "react";
import { useAnimationFrame } from "./useAnimationFrame";
import { useDateState, useDateUpdate } from "./DateContext";
import { useDeck } from "./useDeck";
import { Box, Typography, Button } from "@material-ui/core";
import { animated, useSpring } from "react-spring";

export default React.memo(function IdleScreen({ idle, timeOfDay, onStart }) {
  const date = useDateState();
  const setDate = useDateUpdate();
  const { lightingRef } = useDeck();

  useAnimationFrame(() => {
    const timestamp = date.getTime();
    lightingRef.current.directionalLights[0].timestamp = timestamp;
    setDate(new Date(timestamp + 60000 * (timeOfDay === "night" ? 12 : 1)));
  }, idle);

  const props = useSpring({
    opacity: idle ? 1 : 0,
    transform: idle
      ? "translate3d(0px,0px,0px)"
      : "translate3d(-400px,24px,0px)"
  });

  return (
    <animated.div style={props}>
      <Box position="absolute" zIndex={9999} top={24} left={24} width={600}>
        <Box bgcolor="white" p={3} borderRadius={4} boxShadow={1}>
          <Typography variant="h3">
            Amendment C278: Sunlight to public parks
          </Typography>
          <Typography variant="subtitle1">
            Protecting winter sunlight in our parks with new planning controls.
          </Typography>
        </Box>
        <Box mt={1}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={onStart}
            style={{ fontSize: 32 }}
          >
            How am I affected?
          </Button>
        </Box>
      </Box>
    </animated.div>
  );
});
