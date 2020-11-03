import React from "react";

export const initialContext = { dark: true };

export const themeContext = React.createContext(initialContext);

export const ThemeProvider = themeContext.Provider;

export const ThemeConsumer = themeContext.Consumer;

export const withTheme = (Component) => {
  return React.forwardRef((props, ref) => (
    <ThemeConsumer>
      {(value) => <Component ref={ref} {...props} theme={value}></Component>}
    </ThemeConsumer>
  ));
};
