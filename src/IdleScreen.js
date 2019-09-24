import React from "react";
import { useAnimationFrame } from "./useAnimationFrame";
import { useDateState, useDateUpdate } from "./DateContext";
import { useDeck } from "./useDeck";
import { Box, Typography, Button, Zoom } from "@material-ui/core";

export default function IdleScreen({ idle, onStart }) {
  const date = useDateState();
  const setDate = useDateUpdate();
  const { lightingRef } = useDeck();

  useAnimationFrame(() => {
    const timestamp = date.getTime();
    lightingRef.current.directionalLights[0].timestamp = timestamp;
    setDate(new Date(timestamp + 60000 * 2));
  }, idle);

  return (
    <Zoom in={idle}>
      <Box
        position="absolute"
        zIndex={9999}
        top={0}
        left={0}
        bottom={0}
        right={0}
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
      >
        <Typography variant="h2" align="center">
          How does this affect you?
        </Typography>
        <Typography variant="body2" align="center">
          Winter sun is important. Find out what we're doing to preserve it.
        </Typography>
        <Button variant="contained" color="primary" onClick={onStart}>
          Find out
        </Button>
      </Box>
    </Zoom>
  );
}
