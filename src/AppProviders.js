import React from "react";

import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import { ThemeProvider as StyledThemeProvider } from "styled-components";

import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { MapProvider } from "./common/MapContext";
import { DateProvider } from "./DateContext";

const theme = createMuiTheme();

export default function AppProviders({ children }) {
  return (
    <ThemeProvider theme={theme}>
      <StyledThemeProvider theme={theme}>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <MapProvider>
            <DateProvider>{children}</DateProvider>
          </MapProvider>
        </MuiPickersUtilsProvider>
      </StyledThemeProvider>
    </ThemeProvider>
  );
}
