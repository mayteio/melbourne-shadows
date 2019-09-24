import React, { useState, useEffect } from "react";
import { Box } from "@material-ui/core";
import { startOfDay, format } from "date-fns";
import { useSpring, animated } from "react-spring";

import moon from "./assets/moon.svg";
import sun from "./assets/sun.svg";

const MS_IN_DAY = 86400000;

export default function SunAndMoon({ date, idle }) {
  const start = startOfDay(date).getTime();
  const now = date.getTime();

  const showProps = useSpring({
    transform: `translateY(${idle ? "0px" : "128px"})`
  });

  const [revolutions, setRevolutions] = useState(0);

  useEffect(() => {
    if (format(date, "hh:mm:ss") === "23:59:00") setRevolutions(r => r + 1);
  }, [date]);

  const rotateProps = useSpring({
    transform: `rotate(${(
      ((now - start) / MS_IN_DAY) * 360 +
      360 * revolutions
    ).toFixed(2)}deg)`
  });

  return (
    <AnimatedBox
      style={showProps}
      width={256}
      height={256}
      position="fixed"
      right={64}
      bottom={-128}
      bgcolor="white"
      borderRadius={128}
      zIndex={9999}
    >
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
