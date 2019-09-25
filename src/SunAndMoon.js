import React from "react";
import { Box, Typography } from "@material-ui/core";
import { startOfDay, format } from "date-fns";
import { useSpring, animated } from "react-spring";

import moon from "./assets/moon.svg";
import sun from "./assets/sun.svg";

const MS_IN_DAY = 86400000;

export default function SunAndMoon({ date, idle, timeOfDay }) {
  const start = startOfDay(date).getTime();
  const now = date.getTime();

  const showProps = useSpring({
    // transform: `translateY(${idle ? "0px" : "128px"})`,
    backgroundColor: timeOfDay === "night" ? "#23242b" : "#fff"
  });

  const rotateProps = useSpring({
    transform: `rotate(${(((now - start) / MS_IN_DAY) * 360).toFixed(2)}deg)`
  });

  return (
    <AnimatedBox
      style={showProps}
      width={256}
      height={256}
      position="fixed"
      right={64}
      bottom={-128}
      borderRadius={128}
      zIndex={9999}
      boxShadow={2}
    >
      <Box
        width={1}
        display="flex"
        flexDirection="column"
        alignItems="center"
        position="absolute"
        top={100}
      >
        <Typography
          variant="body1"
          style={{ color: timeOfDay === "day" ? "#23242b" : "#fff" }}
        >
          {format(date, "hh:mm a")}
        </Typography>
      </Box>
      <AnimatedBox position="absolute" top={16} left={96} style={rotateProps}>
        <Box width={64} height={64}>
          <img alt="moon" src={moon} />
        </Box>
        <Box width={64} height={96} />
        <Box width={64} height={64}>
          <img alt="sun" src={sun} />
        </Box>
      </AnimatedBox>
    </AnimatedBox>
  );
}

const AnimatedBox = animated(Box);
