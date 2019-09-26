import React, { useState, useCallback, useMemo } from "react";
import { Box, Typography, Paper, makeStyles, Button } from "@material-ui/core";
import { animated, useTransition } from "react-spring";
import ExamplePark from "./ExamplePark";
import type1 from "./assets/type1.jpg";
import type2 from "./assets/type2.jpg";
import type3 from "./assets/type3.jpg";
import { DEFAULT_VIEW_STATE, useViewstateDispatch } from "./common/MapContext";
import { FlyToInterpolator } from "@deck.gl/core";

const AnimatedBox = animated(Box);

const useStyles = makeStyles(theme => ({
  img: {
    borderRadius: theme.spacing(0.5),
    boxShadow: theme.shadows[2]
  }
}));

export default function ChatBubbles({ idle }) {
  // helper to remove old messages before adding new ones
  const updateMessages = messages => {
    setMessages([]);
    setTimeout(() => {
      setMessages(messages);
    }, 500);
  };

  // things we need for message lists
  const setViewstate = useViewstateDispatch();
  const classes = useStyles();

  const goBack = useCallback(() => {
    setMessages([]);
    setTimeout(() => {
      setViewstate(vs => ({
        ...vs,
        ...DEFAULT_VIEW_STATE,
        transitionInterpolator: new FlyToInterpolator(),
        transitionDuration: 2500
      }));
    }, 500);
    setTimeout(() => {
      setMessages(initialMessages);
    }, 3000);
    // eslint-disable-next-line
  }, [setViewstate]);

  const typeMessages = useCallback(
    i =>
      [
        [
          {
            key: 6,
            message: (
              <>
                <Box display="flex">
                  <Typography variant="h5">Type 1</Typography>
                  <Box
                    width={24}
                    height={24}
                    borderRadius={16}
                    bgcolor="#00a39a"
                    ml={1}
                    position="relative"
                    top={3}
                    boxShadow={2}
                  />
                </Box>
                <Typography variant="body2">
                  These parks are predominantly in low rise areas and generally
                  have good access to sunlight. The aim of the Amendment is to
                  maintain existing levels of sunlight.
                </Typography>
              </>
            ),
            height: 152
          },
          {
            key: 7,
            message: (
              <Typography variant="body2">
                For these parks, the approach is for no additional shadow to be
                allowed on the park beyond the existing shadow between 10am and
                3pm in winter.
              </Typography>
            ),
            height: 100
          },
          {
            key: 8,
            message: (
              <img
                src={type1}
                alt="You can construct buildings or an extension to a building as long as you don't increase the existing shadow on the park."
                width={600}
                height={424}
                className={classes.img}
              />
            ),
            height: 432,
            transparent: true
          },
          {
            key: 5,
            message: (
              <ExamplePark
                viewport={{
                  latitude: -37.79937,
                  longitude: 144.94379,
                  bearing: 15.74,
                  zoom: 18.19
                }}
              />
            ),
            height: 130
          },
          {
            key: 9,
            message: (
              <Button onClick={goBack} variant="contained" color="primary">
                Go back
              </Button>
            ),
            transparent: true,
            height: 80
          }
        ],
        [
          {
            key: 11,
            message: (
              <>
                <Box display="flex">
                  <Typography variant="h5">Type 2</Typography>
                  <Box
                    width={24}
                    height={24}
                    borderRadius={16}
                    bgcolor="#5c347f"
                    ml={1}
                    position="relative"
                    top={3}
                    boxShadow={2}
                  />
                </Box>
                <Typography variant="body2">
                  These parks are in areas with height limits over 4 storeys. No
                  additional overshadowing is allowed beyond the existing shadow
                  (from existing buildings and infrastructure) or an 'allowable'
                  shadow (whichever is greater) cast between 10am and 3pm in
                  winter.
                </Typography>
              </>
            ),
            height: 192
          },
          {
            key: 15,
            message: (
              <img
                src={type2}
                alt="New buildings and extensions to a building must not overshadow the park beyond the existing shadow or the allowable shadow, whichever is the greater."
                width={600}
                height={424}
                className={classes.img}
              />
            ),
            height: 432,
            transparent: true
          },
          {
            key: 12,
            message: (
              <ExamplePark
                viewport={{
                  latitude: -37.80237,
                  longitude: 144.96294,
                  bearing: 121.5,
                  zoom: 17.156,
                  pitch: 60
                }}
              />
            ),
            height: 130
          },
          {
            key: 13,
            message: (
              <Button onClick={goBack} variant="contained" color="primary">
                Go back
              </Button>
            ),
            transparent: true,
            height: 80
          }
        ],
        [
          {
            key: 18,
            message: (
              <>
                <Box display="flex">
                  <Typography variant="h5">Type 3</Typography>
                  <Box
                    width={24}
                    height={24}
                    borderRadius={16}
                    bgcolor="#f68d39"
                    ml={1}
                    position="relative"
                    top={3}
                    boxShadow={2}
                  />
                </Box>
                <Typography variant="body2">
                  These parks are in inner areas and are already surrounded by
                  tall buildings. No additional shadowing is allowed, beyond the
                  existing shadows cast between 10am and 2pm in winter.
                </Typography>
              </>
            ),
            height: 152
          },
          {
            key: 19,
            message: (
              <img
                src={type3}
                alt="You can construct buildings or an extension to a building as long as you do not increase the existing shadow on the park."
                width={600}
                height={424}
                className={classes.img}
              />
            ),
            height: 432,
            transparent: true
          },
          {
            key: 16,
            message: (
              <ExamplePark
                viewport={{
                  latitude: -37.8152,
                  longitude: 144.97562,
                  bearing: -128.645,
                  zoom: 16.52,
                  pitch: 60
                }}
              />
            ),
            height: 130
          },
          {
            key: 17,
            message: (
              <Button onClick={goBack} variant="contained" color="primary">
                Go back
              </Button>
            ),
            transparent: true,
            height: 80
          }
        ]
      ][i],
    [classes.img, goBack]
  );

  const initialMessages = useMemo(
    () => [
      {
        key: 1,
        message: (
          <>
            <Typography variant="h6">
              Sunlight to public parks is great news for you.
            </Typography>
            <Typography variant="subtitle1">
              Parks in Southbank and the central city have existing planning
              controls protecting them from overshadowing in winter.
            </Typography>
          </>
        ),
        height: 222
      },
      {
        key: 2,
        message: (
          <Typography variant="body2">
            We want to extend this to all City of Melbourne parks, which
            currently do not have the same level of protection.
          </Typography>
        ),
        height: 100
      },
      {
        key: 3,
        message: (
          <Typography variant="body2">
            There are three types of overshadowing protections for parks:
          </Typography>
        ),
        height: 80
      },
      {
        key: 4,
        message: (
          <Box display="flex">
            <TypeBox
              primary="Type 1"
              secondary="Generally parks in low scale areas."
              color="#00a39a"
              onClick={() => updateMessages(typeMessages(0))}
            />
            <TypeBox
              primary="Type 2"
              secondary="Parks in urban renewal areas."
              color="#5c347f"
              onClick={() => updateMessages(typeMessages(1))}
            />
            <TypeBox
              primary="Type 3"
              secondary="Parks already surrounded by buildings."
              color="#f68d39"
              onClick={() => updateMessages(typeMessages(2))}
            />
          </Box>
        ),
        transparent: true,
        height: 80
      }
    ],
    [typeMessages]
  );

  const [messages, setMessages] = useState([]);

  let height = 0;
  const gridItems = messages.map((message, i) => {
    const xy = [0, (height += message.height) - message.height];
    return { ...message, xy };
  });

  const transitions = useTransition(gridItems, m => m.key, {
    from: ({ xy }) => ({ xy: [xy[0] - 24, xy[1] + 24], opacity: 0 }),
    enter: ({ xy }) => ({ xy, opacity: 1 }),
    update: ({ xy }) => ({ xy }),
    leave: { opacity: 0, xy: [-24, 0] },
    config: { mass: 3, tension: 700, friction: 50 },
    trail: 100
  });

  React.useEffect(() => {
    setMessages(idle ? [] : initialMessages);
  }, [idle, initialMessages]);

  return (
    <Box position="absolute" left={24} top={24} width={400}>
      {transitions.map(({ item, props: { xy, ...rest }, key }) => (
        <AnimatedBox
          position="absolute"
          key={key}
          style={{
            transform: xy.interpolate(
              (x, y) => `translate3d(${x}px,${y}px,0px)`
            ),
            ...rest
          }}
        >
          {item.transparent ? (
            item.message
          ) : (
            <Paper>
              <Box p={2}>{item.message}</Box>
            </Paper>
          )}
        </AnimatedBox>
      ))}
    </Box>
  );
}

const TypeBox = ({ primary, secondary, color = "", ...rest }) => (
  <Paper style={{ marginRight: 8 }} {...rest}>
    <Box
      p={2}
      borderRadius={4}
      width={180}
      bgcolor={color}
      style={{ cursor: "pointer" }}
    >
      <Typography style={{ color: "#fff" }} variant="h5">
        {primary}
      </Typography>
      <Typography style={{ color: "#fff" }} variant="body2">
        {secondary}
      </Typography>
      <br />
      <Typography style={{ color: "#fff" }} variant="button">
        Learn more
      </Typography>
    </Box>
  </Paper>
);
