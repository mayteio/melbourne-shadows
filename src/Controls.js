import React from "react";
import { Box, Button, Paper, Typography, Slider } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { DatePicker } from "@material-ui/pickers";

const now = new Date();

const useStyles = makeStyles(theme => ({
  slider: {
    markLabel: {
      transform: `translateX(-80%) translateY(${theme.spacing(
        1
      )}) rotate(-45deg)`
    },
    markLabelActive: {
      color: theme.palette.primary.main
    }
  }
}));

export default React.memo(function Controls({ onChange }) {
  const [date, setDate] = React.useState(now);
  const [time, setTime] = React.useState(now.getHours());

  React.useEffect(() => {
    onChange({ time, date });
  }, [time, date, onChange]);

  const classes = useStyles();

  return (
    <Box position="absolute" left={24} right={24} bottom={24} zIndex={99999}>
      <Paper>
        <Box p={4}>
          <Typography variant="h6">Set time for shadow</Typography>
          <Button>Play full day</Button>
          <DatePicker value={date} onChange={setDate} />
          <Slider
            className={classes.slider}
            onChange={(e, v) => setTime(v)}
            value={time}
            defaultValue={5}
            marks={marks}
            step={1}
            min={0}
            max={23}
          />
        </Box>
      </Paper>
    </Box>
  );
});

const marks = [
  { value: 0, label: "00:00" },
  { value: 1, label: "01:00" },
  { value: 2, label: "02:00" },
  { value: 3, label: "03:00" },
  { value: 4, label: "04:00" },
  { value: 5, label: "05:00" },
  { value: 6, label: "06:00" },
  { value: 7, label: "07:00" },
  { value: 8, label: "08:00" },
  { value: 9, label: "09:00" },
  { value: 10, label: "10:00" },
  { value: 11, label: "11:00" },
  { value: 12, label: "12:00" },
  { value: 13, label: "13:00" },
  { value: 14, label: "14:00" },
  { value: 15, label: "15:00" },
  { value: 16, label: "16:00" },
  { value: 17, label: "17:00" },
  { value: 18, label: "18:00" },
  { value: 19, label: "19:00" },
  { value: 20, label: "20:00" },
  { value: 21, label: "21:00" },
  { value: 22, label: "22:00" },
  { value: 23, label: "23:00" }
];
