import React from "react";
import styled from "styled-components";

import Box from "@material-ui/core/Box";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";

import Logo from "./Logo";

export default React.memo(function Branding({
  theme = "light",
  stacked = false,
  title,
  children,
  ...props
}) {
  const { breakpoints } = useTheme();
  const isLarge = useMediaQuery(breakpoints.up("md"));

  return (
    <BrandingStyle shade={theme}>
      <Box
        display="flex"
        flexDirection={stacked ? "column" : { xs: "column", sm: "row" }}
        alignItems={stacked ? "baseline" : {xs: "baseline", sm: "center"}}
        {...props}
      >
        <Box
          className="primary-logo"
          height={{ xs: 35, md: 42 }}
          width="auto"
          p={{xs: 1, md: 1.4}}
        >
          <Logo
            // compact={!isLarge}
            shade={theme}
          />
        </Box>
        <Box
          className="secondary-logo"
          height={{ xs: 35, md: 42 }}
          width={stacked ? "auto" : { xs: "100vw", sm: "auto" }}
          display="flex"
          alignItems={{xs: "baseline", md: "center"}}
          bgcolor={stacked ? "white" : {xs: "grey600", sm: 'transparent'}}
          p={{xs: 1.1, md: 1.4}}
        >
          {title && (
            <Title large={isLarge} shade={theme}>
              {title}
            </Title>
          )}
          {children}
        </Box>
      </Box>
    </BrandingStyle>
  );
});

const getThemeColor = ({ theme, shade }) =>
  shade === "light" ? theme.palette.grey800 : theme.palette.grey100;

const Title = styled.h1`
  font-family: "CoM", "Helvetica Neue", Arial, Helvetica, sans-serif;
  color: ${getThemeColor};
  margin: 0;
  margin-left: ${({ theme }) => theme.spacing(1)}px;
  font-size: 20px;
  margin-top: 2px;
`;

const BrandingStyle = styled.div`
  .CoM_Web_Banner_Logo_svg__st0,
  g,
  polygon,
  d {
    fill: ${getThemeColor}!important;
  }

  svg {
    /* height: 100%; */
    width: auto;
  }

  .primary-logo svg {
    height: 100%;
  }

  .secondary-logo svg {
    height: 100%;
    margin-top: -1px;
  }
`;
