import React from "react";
import Box from "@material-ui/core/Box";

export default function Header(props) {
  return <Box component="header" bgcolor="grey800" minHeight={{ xs: 35, md: 42 }} {...props} />;
}
