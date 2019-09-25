import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import "./fonts/fonts.css";

const fontFamily = [
  "Gotham",
  "Roboto",
  "-apple-system",
  "BlinkMacSystemFont",
  '"Segoe UI"',
  '"Helvetica Neue"',
  "Arial",
  "sans-serif",
  '"Apple Color Emoji"',
  '"Segoe UI Emoji"',
  '"Segoe UI Symbol"'
].join(",");

const headingFontFamily = `"CoM", ${fontFamily}`;

/**
 * Primary colour palette is dark background.
 * Secondary is white background.
 */

export const theme = createMuiTheme({
  palette: {
    primary: { main: "#e50e56" },
    secondary: { main: "#277bb4" },
    error: { main: "#F07B05" },
    gray: {
      100: "#f2f3f4",
      200: "#d4d6db",
      300: "#888B93",
      400: "#3c404b",
      500: "#30323B",
      600: "#23242b",
      700: "#16161A",
      800: "#080809"
    }
  },
  typography: {
    useNextVariants: true,
    // Use the system font instead of the default Roboto font.
    fontFamily,
    h1: { fontFamily: fontFamily },
    h2: { fontFamily: fontFamily },
    h3: { fontFamily: fontFamily },
    h4: { fontFamily: fontFamily },
    h5: { fontFamily: fontFamily },
    h6: { fontFamily: fontFamily, fontSize: 30 }
  },
  overrides: {
    MuiListItemText: {
      primary: {
        // fontWeight: "bold"
      }
    },
    MuiTab: {
      wrapper: {
        // color: "#fff"
      }
    }
  }
});
