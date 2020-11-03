import React, { useState } from "react";
import { ThemeProvider } from "../../providers/Theme/Theme";
import Brightness7Icon from "@material-ui/icons/Brightness7";
import NightsStayIcon from "@material-ui/icons/NightsStay";
import { Fab, Tooltip } from "@material-ui/core";
import { themeSelectorStyle } from "./ThemeSelector.style";

export const ThemeSelector = ({ children }) => {
  const [dark, setDark] = useState(false);

  const handleClick = () => {
    setDark(!dark);
  };

  const iconMessage = dark ? "Click for light theme" : "Click for dark theme";

  return (
    <>
      <ThemeProvider value={{ dark }}>{children}</ThemeProvider>

      <Tooltip title={iconMessage} aria-label={iconMessage}>
        <Fab
          color="primary"
          onClick={handleClick}
          style={themeSelectorStyle.absolute}
        >
          {dark ? <Brightness7Icon /> : <NightsStayIcon />}
        </Fab>
      </Tooltip>
    </>
  );
};
