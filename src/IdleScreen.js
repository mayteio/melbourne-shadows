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
      <Box position="absolute" zIndex={9999} top={24} left={24} width={600}>
        <Box bgcolor="white" p={3} borderRadius={4} boxShadow={1}>
          <Typography variant="h3">
            How does this amendment affect you?
          </Typography>
          <Typography variant="subtitle1">
            Winter sun is important. Find out what we're doing to preserve it.
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
            Find out
          </Button>
        </Box>
      </Box>
    </Zoom>
  );
}
